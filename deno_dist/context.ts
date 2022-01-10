import { Context } from "./types/index.ts";

export function createContext(size = 1024): Context {
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
