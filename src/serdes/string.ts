import { define } from "../define";
import { StringFactory } from "../types";

export const string: StringFactory = (encoding, headSd) =>
  define(
    (ctx, data) => {
      const head = ctx.i;
      // approximated payload length (unfavorable for ucs2, good enough for utf8, perfect for latin1)
      headSd.ser(ctx, data.length);
      const begin = ctx.i;
      const headSize = begin - head;
      encoding.encode(ctx, data);
      const end = ctx.i;
      const size = end - begin;
      // stop if approximation is correct
      if (size === data.length) return;
      // write actual header after payload
      headSd.ser(ctx, size);
      const requiredHeadSize = ctx.i - end;
      // check if approximated header size is wrong
      if (headSize !== requiredHeadSize) {
        // if yes, shift the payload
        ctx.bytes.copyWithin(head + requiredHeadSize, begin, end);
      }
      ctx.i = head;
      headSd.ser(ctx, size);
      ctx.i = end + (requiredHeadSize - headSize);
    },
    (ctx) => encoding.decode(ctx, headSd.des(ctx))
  );
