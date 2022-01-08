import { AsyncTyper } from "../types";

export function asyncOptional<T>(
  typer: AsyncTyper<T | void>
): AsyncTyper<T | void> {
  return {
    async encode(ctx, data) {
      if (data == undefined) {
        ctx.view.setUint8(ctx.i++, 0);
      } else {
        ctx.view.setUint8(ctx.i++, 1);
        await typer.encode(ctx, data);
      }
    },
    async decode(ctx) {
      if (ctx.view.getUint8(ctx.i++)) {
        return await typer.decode(ctx);
      }
    }
  };
}
