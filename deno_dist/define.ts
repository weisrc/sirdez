import { createContext, contextDes, contextSer } from "./context.ts";
import { Des, SerDes, Ser } from "./types/index.ts";

export function define<T>(ser: Ser<T>, des: Des<T>): SerDes<T> {
  const ctx = createContext();
  return {
    ser,
    des,
    toBytes(data) {
      contextSer(ctx, ser, data);
      return ctx.bytes.slice(0, ctx.i);
    },
    toTempBytes(data) {
      contextSer(ctx, ser, data);
      return ctx.bytes.subarray(0, ctx.i);
    },
    fromBytes(buf: Uint8Array) {
      return contextDes(ctx, des, buf);
    }
  };
}
