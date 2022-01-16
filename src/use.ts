import {
  contextDes,
  contextSer,
  createContext,
  SerDes,
  UsableSerDes
} from ".";

export function use<T>({ ser, des }: SerDes<T>): UsableSerDes<T> {
  const ctx = createContext();
  return {
    ser,
    des,
    toBytes(data) {
      contextSer(ctx, ser, data);
      return ctx.bytes.slice(0, ctx.i);
    },
    toUnsafeBytes(data) {
      contextSer(ctx, ser, data);
      return ctx.bytes.subarray(0, ctx.i);
    },
    fromBytes(bytes) {
      return contextDes(ctx, des, bytes);
    }
  };
}
