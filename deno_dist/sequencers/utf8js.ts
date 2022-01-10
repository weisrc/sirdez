import { Sequencer } from "../types/index.ts";

export const utf8js: Sequencer<string> = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      const code = data.charCodeAt(i) as number;
      if (code < 0x80) {
        // 0xxxxxxx
        ctx.view.setUint8(ctx.i, code);
        ctx.i++;
      } else if (code < 0x800) {
        // .... .aaa - aabb bbbb
        // 110a aaaa - 10bb bbbb
        const a = (code & 0x7_c0) << 2;
        const b = code & 0x3f;
        ctx.view.setUint16(ctx.i, a | b | 0xc080);
        ctx.i += 2;
      } else if (code < 0xd800 || code >= 0xe000) {
        // .... .... - .... .... - aaaa bbbb - bbcc cccc
        // 1110 aaaa - 10bb bbbb - 10cc cccc - .... ....
        const a = (code & 0xf0_00) << 12;
        const b = (code & 0xf_c0) << 10;
        const c = (code & 0x3f) << 8;
        ctx.view.setUint32(ctx.i, a | b | c | 0xe0_80_80_00);
        ctx.i += 3;
      } else {
        const code = data.codePointAt(i++) as number;
        // .... .... - .... aabb - bbbb cccc - ccdd dddd
        // 1111 00aa - 10bb bbbb - 10cc cccc - 10dd dddd
        const a = (code & 0x1c_00_00) << 6;
        const b = (code & 0x3_f0_00) << 4;
        const c = (code & 0xf_c0) << 2;
        const d = code & 0x3f;
        ctx.view.setUint32(ctx.i, a | b | c | d | 0xf0_80_80_80);
        ctx.i += 4;
      }
    }
  },
  decode(ctx, end) {
    const codes: number[] = [];
    while (ctx.i < end) {
      const s = ctx.view.getUint8(ctx.i);
      if (s < 192) {
        // 0xxxxxxx
        codes.push(s);
        ctx.i++;
      } else if (s < 224) {
        //     110a aaaa
        //     10bb bbbb
        // aaa aabb bbbb
        const b = ctx.view.getUint8(ctx.i + 1);
        ctx.i += 2;
        codes.push(((s & 0x1f) << 6) | (b & 0x3f));
      } else if (s < 240) {
        //           1110 aaaa
        //           10bb bbbb
        //           10cc cccc
        // aaaa bbbb bbcc cccc
        const b = ctx.view.getUint8(ctx.i + 1);
        const c = ctx.view.getUint8(ctx.i + 2);
        ctx.i += 3;
        codes.push(
          ((s & 0x0f) << 12) | ((b & 0x3f) << 6) | (c & 0x3f)
        );
      } else {
        // 1111 0aaa, 10bb bbbb, 10cc cccc, 10dd dddd
        //               a aabb, bbbb cccc, ccdd dddd

        const u = ctx.view.getUint32(ctx.i);
        const a = (s & 0x7) << 18;
        const b = (u & 0x3f_00_00) >> 4;
        const c = (u & 0x3f_00) >> 2;
        const d = u & 0x3f;
        codes.push(a | b | c | d);
        ctx.i += 4;
      }
    }
    return String.fromCodePoint.apply(null, codes);
  }
};
