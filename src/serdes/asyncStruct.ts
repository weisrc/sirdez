import { asyncDefine } from "../asyncDefine";
import { AsyncStructFactory, AsyncTupleFactory } from "../types";

export const asyncStruct: AsyncStructFactory = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return asyncDefine(
    async (ctx, data) => {
      for (const key in definition) {
        await definition[key].ser(ctx, data[key]);
      }
    },
    async (ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = obj() as any;
      for (const key in definition) {
        data[key] = await definition[key].des(ctx);
      }
      return data;
    }
  );
};

export const asyncTuple: AsyncTupleFactory = (...defintion) =>
  asyncStruct(defintion);
