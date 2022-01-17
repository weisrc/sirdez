import { Encoding } from "../types";

const { latin1Write, latin1Slice } = Buffer.prototype;

export const latin1: Encoding<string> = {
  encode(ctx, data) {
    ctx.i += latin1Write.call(ctx.bytes, data, ctx.i);
  },
  decode: (ctx, end) =>
    latin1Slice.call(ctx.bytes, ctx.i, (ctx.i = end))
};
