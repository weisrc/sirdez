import { asyncDefine } from "../asyncDefine.ts";
import { AsyncRecordFactory, GetType } from "../types/index.ts";

export const asyncRecord: AsyncRecordFactory = (sd, headSd, keySd) =>
  asyncDefine(
    async (ctx, data) => {
      const { length } = Object.keys(data);
      headSd.ser(ctx, length);
      for (const key in data) {
        keySd.ser(ctx, key);
        await sd.ser(ctx, data[key]);
      }
    },
    async (ctx) => {
      const length = headSd.des(ctx);
      const data: Record<
        GetType<typeof keySd>,
        GetType<typeof sd>
      > = {};
      for (let i = 0; i < length; i++) {
        data[keySd.des(ctx)] = await sd.des(ctx);
      }
      return data;
    }
  );
