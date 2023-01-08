import { Buffer } from "https://deno.land/std@0.85.0/node/buffer.ts";
import { Encoding } from "../types/index.ts";

const { utf8Write, utf8Slice } = Buffer.prototype;

export const utf8: Encoding<string> = {
  encode(ctx, data) {
    ctx.i += utf8Write.call(ctx.bytes, data, ctx.i);
  },
  decode: (ctx, size) =>
    utf8Slice.call(ctx.bytes, ctx.i, (ctx.i += size))
};
