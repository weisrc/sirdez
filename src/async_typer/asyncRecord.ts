import { Typer, AsyncTyper } from "../types";

export function asyncRecord<T>(
  typer: AsyncTyper<T>,
  header: Typer<number>,
  keyer: Typer<string>
): AsyncTyper<Record<string, T>> {
  return {
    async encode(ctx, data) {
      const { length } = Object.keys(data);
      header.encode(ctx, length);
      for (const key in data) {
        keyer.encode(ctx, key);
        await typer.encode(ctx, data[key]);
      }
    },
    async decode(ctx) {
      const length = header.decode(ctx);
      const data: Record<string, T> = {};
      for (let i = 0; i < length; i++) {
        data[keyer.decode(ctx)] = await typer.decode(ctx);
      }
      return data;
    }
  };
}
