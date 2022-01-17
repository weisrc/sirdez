import {
  contextDes,
  contextSer,
  createContext,
  Serdes,
  UsableSerdes
} from ".";

export function use<T>({ ser, des }: Serdes<T>): UsableSerdes<T> {
  const ctx = createContext();
  return {
    ser,
    des,
    toBytes: (data) => contextSer(ctx, ser, data).slice(0, ctx.i),
    toUnsafeBytes: (data) =>
      contextSer(ctx, ser, data).subarray(0, ctx.i),
    fromBytes: (bytes) => contextDes(ctx, des, bytes)
  };
}
