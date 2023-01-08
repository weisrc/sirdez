import {
  contextDes,
  contextSer,
  createContext,
  Serdes,
  UsableSerdes
} from "./index.ts";

export function use<T>(
  { ser, des }: Serdes<T>,
  size?: number
): UsableSerdes<T> {
  const ctx = createContext(size);
  return {
    ser,
    des,
    toBytes: (data) => contextSer(ctx, ser, data).slice(0, ctx.i),
    toUnsafeBytes: (data) =>
      contextSer(ctx, ser, data).subarray(0, ctx.i),
    fromBytes: (bytes) => contextDes(ctx, des, bytes)
  };
}
