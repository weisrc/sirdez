import { asyncDefine } from "../asyncDefine.ts";
import { AsyncArrayFactory } from "../types/index.ts";

export const asyncArray: AsyncArrayFactory = (sd, headSd) =>
  asyncDefine(
    async (ctx, data) => {
      const { length } = data;
      headSd.ser(ctx, length);
      for (let i = 0; i < length; i++) {
        await sd.ser(ctx, data[i]);
      }
    },
    async (ctx) => {
      const length = headSd.des(ctx);
      const data = [];
      for (let i = 0; i < length; i++) {
        data.push(await sd.des(ctx));
      }
      return data;
    }
  );
