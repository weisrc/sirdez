import { Context, Des, Ser } from "./types";

export function createContext(size = 4096): Context {
  const buffer = new ArrayBuffer(size);
  return {
    i: 0,
    view: new DataView(buffer),
    bytes: new Uint8Array(buffer)
  };
}

export function growContext(ctx: Context) {
  ctx.bytes = new Uint8Array(ctx.bytes.length * 2);
  ctx.view = new DataView(ctx.bytes.buffer);
}

export function contextSer<T>(
  ctx: Context,
  ser: Ser<T>,
  data: T
): Uint8Array {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const limit = ctx.bytes.length - 8;
    ctx.i = 0;
    try {
      ser(ctx, data);
      if (ctx.i < limit) return ctx.bytes;
    } catch (error) {
      if (ctx.i < limit && !(error instanceof RangeError)) throw error;
    }
    growContext(ctx);
  }
}

export function contextDes<T>(
  ctx: Context,
  des: Des<T>,
  bytes: Uint8Array
): T {
  const { length } = bytes;
  if (length < 4096) {
    ctx.bytes.set(bytes);
    ctx.i = 0;
  } else {
    ctx = contextFromBytes(bytes);
  }
  const data = des(ctx);
  if (ctx.i !== length)
    throw RangeError(
      `Expected to process ${length} bytes, processed ${ctx.i} bytes instead`
    );
  return data;
}

export function contextFromBytes(array: Uint8Array): Context {
  return {
    i: 0,
    bytes: array,
    view: new DataView(
      array.buffer,
      array.byteOffset,
      array.byteLength
    )
  };
}
