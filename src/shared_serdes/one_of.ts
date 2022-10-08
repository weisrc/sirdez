import { define } from "../define";
import { OneOfFactory } from "../types";

export class InvalidOneOfType extends Error {
  constructor(readonly type: number) {
    super(`Invalid oneOf type (${type})`);
  }
}

export const oneOf: OneOfFactory = (headSd, typeToSerdes) => {
  const types = Object.keys(
    typeToSerdes
  ) as (keyof typeof typeToSerdes)[];

  const typeToInt = mapKeysToIndexes(types);
  const intToType = swapKeysAndValues(typeToInt);

  return define(
    (ctx, data) => {
      const i = typeToInt[data.type];
      headSd.ser(ctx, i);

      const serdes = typeToSerdes[data.type];
      serdes.ser(ctx, data.value);
    },

    (ctx) => {
      const i = headSd.des(ctx);
      const type = intToType[i];

      if (type === undefined) {
        throw new InvalidOneOfType(i);
      }

      const serdes = typeToSerdes[type];
      const value = serdes.des(ctx);

      return { type, value };
    }
  );
};

type Key = string | number | symbol;

function mapKeysToIndexes<T extends Key>(
  keys: T[]
): Record<T, number> {
  const result: Record<T, number> = {} as Record<T, number>;

  for (let i = 0; i < keys.length; ++i) {
    const e = keys[i];
    result[e] = i;
  }

  return result;
}

function swapKeysAndValues<K extends Key, V extends Key>(
  obj: Record<K, V>
): Record<V, K> {
  const result: Record<V, K> = {} as Record<V, K>;

  for (const k of Object.keys(obj) as K[]) {
    const v = obj[k];
    result[v] = k;
  }

  return result;
}
