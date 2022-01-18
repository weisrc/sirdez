import { Encoding } from "../types";

const encoder = /*@__PURE__*/ new TextEncoder();
const decoder = /*@__PURE__*/ new TextDecoder();

export const utf8: Encoding<string> = {
  encode(ctx, data) {
    ctx.i += encoder.encodeInto(data, ctx.bytes.subarray(ctx.i))
      .written as number;
  },
  decode: (ctx, size) =>
    decoder.decode(ctx.bytes.subarray(ctx.i, (ctx.i += size)))
};
