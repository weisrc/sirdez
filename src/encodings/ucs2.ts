import { Encoding } from "../types";

export const ucs2: Encoding<string> = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      ctx.view.setUint16(ctx.i, data.charCodeAt(i));
      ctx.i += 2;
    }
  },
  decode(ctx, size) {
    const length = size / 2;
    const codes: number[] = new Array(length);
    for (let i = 0; i < length; i++) {
      codes[i] = ctx.view.getUint16(ctx.i);
      ctx.i += 2;
    }
    return String.fromCharCode(...codes);
  }
};
