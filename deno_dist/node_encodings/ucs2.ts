import { Buffer } from "https://deno.land/std@0.85.0/node/buffer.ts";
import { Encoding } from "../types/index.ts";

const { ucs2Write, ucs2Slice } = Buffer.prototype;

export const ucs2: Encoding<string> = {
  encode(ctx, data) {
    ctx.i += ucs2Write.call(ctx.bytes, data, ctx.i);
  },
  decode: (ctx, size) =>
    ucs2Slice.call(ctx.bytes, ctx.i, (ctx.i += size))
};
