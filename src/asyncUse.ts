import { asyncEncodeIntoContext } from ".";
import { contextFromArray, createContext } from "./context";
import { AsyncConverter, AsyncTyper, Context } from "./types";

export function asyncUse<T>(typer: AsyncTyper<T>): AsyncConverter<T> {
  const pool: Context[] = [];

  async function encode(data: T) {
    const ctx = pool.pop() ?? createContext();
    await asyncEncodeIntoContext(ctx, typer, data);
    pool.push(ctx);
    return ctx;
  }

  return {
    async encode(data) {
      const ctx = await encode(data);
      return ctx.bytes.slice(0, ctx.i);
    },
    async instantEncode(data) {
      const ctx = await encode(data);
      return ctx.bytes.subarray(0, ctx.i);
    },
    decode(array: Uint8Array) {
      return typer.decode(contextFromArray(array));
    }
  };
}
