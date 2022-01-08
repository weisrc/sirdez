import { Typer } from "../types";

export function array<T>(
  typer: Typer<T>,
  header: Typer<number>
): Typer<T[]> {
  return {
    encode(ctx, data) {
      const { length } = data;
      header.encode(ctx, length);
      for (let i = 0; i < length; i++) {
        typer.encode(ctx, data[i]);
      }
    },
    decode(ctx) {
      const length = header.decode(ctx);
      const data = [];
      for (let i = 0; i < length; i++) {
        data.push(typer.decode(ctx));
      }
      return data;
    }
  };
}
