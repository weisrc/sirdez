import { define } from "../define.ts";
import { MapFactory, GetType } from "../types/index.ts";

export const map: MapFactory = (keySd, valueSd, headSd) =>
  define(
    (ctx, data) => {
      const { length } = Object.keys(data);
      headSd.ser(ctx, length);
      for (const key in data) {
        keySd.ser(ctx, key);
        valueSd.ser(ctx, data[key]);
      }
    },
    (ctx) => {
      const length = headSd.des(ctx);
      const data: Record<string, GetType<typeof valueSd>> = {};
      for (let i = 0; i < length; i++) {
        data[keySd.des(ctx)] = valueSd.des(ctx);
      }
      return data;
    }
  );
