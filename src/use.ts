import {
  contextFromArray,
  createContext,
  growContext
} from "./context";
import { Converter, Typer } from "./types";

export function use<T>(type: Typer<T>): Converter<T> {
  const ctx = createContext(1024);
  return {
    encode(data) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const limit = ctx.bytes.length - 8;
        try {
          ctx.i = 0;
          type.encode(ctx, data);
          if (ctx.i < limit) {
            return ctx.bytes.subarray(0, ctx.i);
          }
        } catch (error) {
          if (ctx.i < limit) {
            throw error;
          }
        }
        growContext(ctx);
      }
    },
    decode(array: Uint8Array) {
      return type.decode(contextFromArray(array));
    }
  };
}
