import { Encoding } from "../types";

export const latin1: Encoding<string> = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      ctx.view.setUint8(ctx.i++, data.charCodeAt(i));
    }
  },
  decode(ctx, size) {
    const codes: number[] = new Array(size);
    for (let i = 0; i < size; i++) {
      codes[i] = ctx.view.getUint8(ctx.i++);
    }
    return String.fromCharCode(...codes);
  }
};
