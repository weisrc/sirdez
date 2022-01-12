import { AsyncTyper, Context, Typer } from "./types";

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

export function encodeIntoContext<T>(
  ctx: Context,
  typer: Typer<T>,
  data: T
): void {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const limit = ctx.bytes.length - 8;
    ctx.i = 0;
    try {
      typer.encode(ctx, data);
      if (ctx.i < limit) return;
    } catch (error) {
      if (ctx.i < limit) throw error;
    }
    growContext(ctx);
  }
}

export async function asyncEncodeIntoContext<T>(
  ctx: Context,
  typer: AsyncTyper<T>,
  data: T
) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const limit = ctx.bytes.length - 8;
    ctx.i = 0;
    try {
      await typer.encode(ctx, data);
      if (ctx.i < limit) return;
    } catch (error) {
      if (ctx.i < limit) throw error;
    }
    growContext(ctx);
  }
}

export function decodeFromArray<T>(
  ctx: Context,
  typer: Typer<T>,
  array: Uint8Array
): T {
  const { length } = array;
  if (length < 4096) {
    ctx.bytes.set(array);
    ctx.i = 0;
    return typer.decode(ctx);
  } else {
    return typer.decode(contextFromArray(array));
  }
}

export function contextFromArray(array: Uint8Array): Context {
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
