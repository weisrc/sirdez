/* eslint no-constant-condition: ["error", { "checkLoops": false }] */

import { contextFromArray, createContext } from "./context";
import { AsyncConverter, AsyncTyper } from "./types";

export function asyncUse<T>(type: AsyncTyper<T>): AsyncConverter<T> {
  let size = 64;
  return {
    async encode(data) {
      while (true) {
        const ctx = createContext(size);
        const limit = ctx.bytes.length - 8;
        try {
          ctx.i = 0;
          await type.encode(ctx, data);
          if (ctx.i < limit) {
            return ctx.bytes.subarray(0, ctx.i);
          }
        } catch (error) {
          if (ctx.i < limit) {
            throw error;
          }
        }
        size = ctx.i * 2;
      }
    },
    decode(array: Uint8Array) {
      return type.decode(contextFromArray(array));
    }
  };
}
