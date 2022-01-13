import { define } from "../define";
import { ArrayFactory } from "../types";

export const array: ArrayFactory = (sd, headSd) =>
  define(
    (ctx, data) => {
      const { length } = data;
      headSd.ser(ctx, length);
      for (let i = 0; i < length; i++) {
        sd.ser(ctx, data[i]);
      }
    },
    (ctx) => {
      const length = headSd.des(ctx);
      const data = [];
      for (let i = 0; i < length; i++) {
        data.push(sd.des(ctx));
      }
      return data;
    }
  );
