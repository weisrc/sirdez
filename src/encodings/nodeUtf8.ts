import { Encoding } from "../types";

const { utf8Write, utf8Slice } = Buffer.prototype;

export const nodeUtf8: Encoding<string> = {
  encode(ctx, data) {
    ctx.i += utf8Write.call(ctx.bytes, data, ctx.i);
  },
  decode(ctx, end) {
    return utf8Slice.call(ctx.bytes, ctx.i, (ctx.i = end));
  }
};
