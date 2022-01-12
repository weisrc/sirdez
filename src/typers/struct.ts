import { StructMaker, TupleMaker, GetType } from "..";

export const struct: StructMaker = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return {
    encode(ctx, data) {
      for (const key in definition) {
        definition[key].encode(ctx, data[key]);
      }
    },
    decode(ctx) {
      const data = obj() as GetType<typeof this>;
      for (const key in definition) {
        data[key] = definition[key].decode(ctx);
      }
      return data;
    }
  };
};

export const tuple: TupleMaker = (...definition) =>
  struct(definition);
