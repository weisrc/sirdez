import { StringMaker } from "../types/index.ts";

export const string: StringMaker = (sequencer, header) => ({
  encode(ctx, data) {
    const head = ctx.i;
    header.encode(ctx, 0);
    const begin = ctx.i;
    sequencer.encode(ctx, data);
    const end = ctx.i;
    const size = end - begin;
    ctx.i = head;
    header.encode(ctx, size);
    ctx.i = end;
  },
  decode(ctx) {
    return sequencer.decode(ctx, header.decode(ctx) + ctx.i);
  }
});
