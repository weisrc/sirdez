import { Struct, AsyncTyper, AsyncTyperStruct } from "../types";

export function asyncStructNoEval<T extends Struct>(
  definition: AsyncTyperStruct<T>
): AsyncTyper<T> {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return {
    async encode(ctx, data) {
      for (const key in definition) {
        await definition[key].encode(ctx, data[key]);
      }
    },
    async decode(ctx) {
      const data = obj() as T;
      for (const key in definition) {
        data[key] = await definition[key].decode(ctx);
      }
      return data;
    }
  };
}

export function asyncTupleNoEval<T extends unknown[]>(
  ...definition: AsyncTyperStruct<T>
): AsyncTyper<T> {
  return asyncStructNoEval(definition);
}
