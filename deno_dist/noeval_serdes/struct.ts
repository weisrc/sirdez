import { define, StructFactory, TupleFactory } from "../index.ts";

export const struct: StructFactory = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return define(
    (ctx, data) => {
      for (const key in definition) {
        definition[key].ser(ctx, data[key]);
      }
    },
    (ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = obj() as any;
      for (const key in definition) {
        data[key] = definition[key].des(ctx);
      }
      return data;
    }
  );
};

export const tuple: TupleFactory = (...definition) =>
  struct(definition);
