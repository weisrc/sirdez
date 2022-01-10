import { Sequencer } from "../types/index.ts";

const encoder = /*@__PURE__*/ new TextEncoder();
const decoder = /*@__PURE__*/ new TextDecoder();

export const utf8: Sequencer<string> = {
  encode(ctx, data) {
    ctx.i += encoder.encodeInto(data, ctx.bytes.subarray(ctx.i))
      .written as number;
  },
  decode(ctx, end) {
    return decoder.decode(ctx.bytes.subarray(ctx.i, (ctx.i = end)));
  }
};
