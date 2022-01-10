import { StructMaker, TupleMaker, TypeOf } from "../index.ts";

export const struct: StructMaker = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return {
    encode(ctx, data) {
      for (const key in definition) {
        definition[key].encode(ctx, data[key]);
      }
    },
    decode(ctx) {
      const data = obj() as TypeOf<typeof this>;
      for (const key in definition) {
        data[key] = definition[key].decode(ctx);
      }
      return data;
    }
  };
};

export const tuple: TupleMaker = (...definition) =>
  struct(definition);
