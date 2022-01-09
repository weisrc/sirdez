import { Typer } from "../types";

export const boolean: Typer<boolean> = {
  encode(ctx, data) {
    ctx.view.setUint8(ctx.i++, +data);
  },
  decode(ctx) {
    return Boolean(ctx.view.getUint8(ctx.i++));
  }
};
