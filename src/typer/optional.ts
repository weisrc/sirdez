import { Typer } from "../types";

export function optional<T>(typer: Typer<T | void>): Typer<T | void> {
  return {
    encode(ctx, data) {
      if (data == undefined) {
        ctx.view.setUint8(ctx.i++, 0);
      } else {
        ctx.view.setUint8(ctx.i++, 1);
        typer.encode(ctx, data);
      }
    },
    decode(ctx) {
      if (ctx.view.getUint8(ctx.i++)) {
        return typer.decode(ctx);
      }
    }
  };
}
