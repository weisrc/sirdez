import { Encoding } from "../types/index.ts";

export const ascii: Encoding<string> = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      ctx.view.setUint8(ctx.i++, data.charCodeAt(i));
    }
  },
  decode(ctx, end) {
    return String.fromCharCode.apply(
      null,
      ctx.bytes.subarray(ctx.i, (ctx.i = end)) as unknown as number[]
    );
  }
};
