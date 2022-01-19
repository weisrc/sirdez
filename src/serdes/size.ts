import { define } from "../define";
import { Serdes } from "../types";

export const usize: Serdes<number> = define(
  (ctx, data) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const byte = data & 0x7f;
      data >>= 7;
      if (data) {
        ctx.view.setUint8(ctx.i++, byte | 0x80);
      } else {
        ctx.view.setUint8(ctx.i++, byte);
        return;
      }
    }
  },
  (ctx) => {
    let byte: number,
      res = 0,
      off = 0;
    do {
      byte = ctx.view.getUint8(ctx.i++);
      res += (byte & 0x7f) << off;
      off += 7;
    } while (byte > 0x7f);
    return res;
  }
);

export const size: Serdes<number> = define(
  (ctx, data) => usize.ser(ctx, data >= 0 ? data * 2 : data * -2 - 1),
  (ctx) => {
    const num = usize.des(ctx);
    return num & 1 ? (num + 1) / -2 : num / 2;
  }
);
