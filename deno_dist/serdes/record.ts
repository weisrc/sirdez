import { define } from "../define.ts";
import { RecordFactory, GetType } from "../types/index.ts";

export const record: RecordFactory = (sd, headSd, keySd) =>
  define(
    (ctx, data) => {
      const { length } = Object.keys(data);
      headSd.ser(ctx, length);
      for (const key in data) {
        keySd.ser(ctx, key);
        sd.ser(ctx, data[key]);
      }
    },
    (ctx) => {
      const length = headSd.des(ctx);
      const data: Record<string, GetType<typeof sd>> = {};
      for (let i = 0; i < length; i++) {
        data[keySd.des(ctx)] = sd.des(ctx);
      }
      return data;
    }
  );
