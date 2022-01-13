import { AsyncSer, Context, Des, Ser } from "./types";

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
): void {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const limit = ctx.bytes.length - 8;
    ctx.i = 0;
    try {
      ser(ctx, data);
      if (ctx.i < limit) return;
    } catch (error) {
      if (ctx.i < limit) throw error;
    }
    growContext(ctx);
  }
}

export async function asyncContextSer<T>(
  ctx: Context,
  ser: AsyncSer<T>,
  data: T
) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const limit = ctx.bytes.length - 8;
    ctx.i = 0;
    try {
      await ser(ctx, data);
      if (ctx.i < limit) return;
    } catch (error) {
      if (ctx.i < limit) throw error;
    }
    growContext(ctx);
  }
}

export function contextDes<T>(
  ctx: Context,
  des: Des<T>,
  buf: Uint8Array
): T {
  const { length } = buf;
  if (length < 4096) {
    ctx.bytes.set(buf);
    ctx.i = 0;
    return des(ctx);
  } else {
    return des(contextFromBytes(buf));
  }
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
