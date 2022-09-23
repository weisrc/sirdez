import { define } from "../define";
import { Serdes, StructDefinition } from "../types";

type StringOnly<T> = T extends string ? T : never;

type OneOfMap<T> = {
  [K in StringOnly<keyof T>]: {
    type: K;
    value: T[K];
  };
};

type ValueOf<T> = T[keyof T];
type OneOf<T> = ValueOf<OneOfMap<T>>;

export class InvalidOneOfType extends Error {
  constructor(readonly type: number) {
    super(`Invalid oneOf type (${type})`);
  }
}

export function oneOf<T extends Record<string, unknown>>(
  headSd: Serdes<number>,
  typeToSerdes: StructDefinition<T>
) {
  const types = Object.keys(typeToSerdes) as StringOnly<keyof T>[];

  types.sort();

  const typeToInt = mapKeysToIndexes(types);
  const intToType = swapKeysAndValues(typeToInt);

  return define<OneOf<T>>(
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
}

function mapKeysToIndexes<T extends string>(keys: T[]): Record<T, number> {
  const result: Record<T, number> = {} as Record<T, number>;

  for (let i = 0; i < keys.length; ++i) {
    const e = keys[i];
    result[e] = i;
  }

  return result;
}

type Key = string | number | symbol;

function swapKeysAndValues<K extends Key, V extends Key>(obj: Record<K, V>): Record<V, K> {
  const result: Record<V, K> = {} as Record<V, K>;

  for (const k of Object.keys(obj) as K[]) {
    const v = obj[k];
    result[v] = k;
  }

  return result;
}
