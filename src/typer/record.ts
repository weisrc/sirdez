import { Typer } from "../types";

export function record<T>(
  typer: Typer<T>,
  header: Typer<number>,
  keyer: Typer<string>
): Typer<Record<string, T>> {
  return {
    encode(ctx, data) {
      const { length } = Object.keys(data);
      header.encode(ctx, length);
      for (const key in data) {
        keyer.encode(ctx, key);
        typer.encode(ctx, data[key]);
      }
    },
    decode(ctx) {
      const length = header.decode(ctx);
      const data: Record<string, T> = {};
      for (let i = 0; i < length; i++) {
        data[keyer.decode(ctx)] = typer.decode(ctx);
      }
      return data;
    }
  };
}
