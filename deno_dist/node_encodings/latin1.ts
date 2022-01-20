import { Buffer } from "https://deno.land/std@0.85.0/node/buffer.ts";
import { Encoding } from "../types/index.ts";

const { latin1Write, latin1Slice } = Buffer.prototype;

export const latin1: Encoding<string> = {
  encode(ctx, data) {
    ctx.i += latin1Write.call(ctx.bytes, data, ctx.i);
  },
  decode: (ctx, size) =>
    latin1Slice.call(ctx.bytes, ctx.i, (ctx.i += size))
};
