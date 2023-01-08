import { Context, Encoding, Ser } from "../types/index.ts";
import { pack } from "./pack.ts";
import { packSize } from "./size.ts";
import { unpack } from "./unpack.ts";

export function packMap(
  ctx: Context,
  data: Record<string | number, unknown>,
  floatHead: number,
  float: Ser<number>,
  str: Ser<string>
) {
  const keys = Object.keys(data);
  const { length } = keys;
  packSize(ctx, length, 0x80, 0xde);
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    pack(ctx, key, floatHead, float, str);
    pack(ctx, data[key], floatHead, float, str);
  }
}

export function unpackMapBody(
  ctx: Context,
  size: number,
  encoding: Encoding<string>
) {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < size; i++) {
    data[unpack(ctx, encoding) as string] = unpack(ctx, encoding);
  }
  return data;
}
