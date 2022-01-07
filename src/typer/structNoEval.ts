import { Struct, Typer, TyperStruct } from "../types";

export function structNoEval<T extends Struct>(
  definition: TyperStruct<T>
): Typer<T> {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return {
    encode(ctx, data) {
      for (const key in definition) {
        definition[key].encode(ctx, data[key]);
      }
    },
    decode(ctx) {
      const data = obj() as T;
      for (const key in definition) {
        data[key] = definition[key].decode(ctx);
      }
      return data;
    }
  };
}

export function tupleNoEval<T extends unknown[]>(
  ...definition: TyperStruct<T>
): Typer<T> {
  return structNoEval(definition);
}
