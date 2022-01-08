import { Sequencer, Typer } from "../types";

export function string(
  sequencer: Sequencer<string>,
  header: Typer<number>
): Typer<string> {
  return {
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
  };
}
