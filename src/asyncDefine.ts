import {
  asyncContextSer,
  contextFromBytes,
  createContext
} from "./context";
import { AsyncDes, AsyncSer, AsyncSerDes } from "./types";

export function asyncDefine<T>(
  ser: AsyncSer<T>,
  des: AsyncDes<T>
): AsyncSerDes<T> {
  const ctx = createContext();
  return {
    ser,
    des,
    async toBytes(data) {
      await asyncContextSer(ctx, ser, data);
      return ctx.bytes.slice(0, ctx.i);
    },
    async toTempBytes(data) {
      await asyncContextSer(ctx, ser, data);
      return ctx.bytes.subarray(0, ctx.i);
    },
    fromBytes(buf: Uint8Array) {
      return des(contextFromBytes(buf));
    }
  };
}
