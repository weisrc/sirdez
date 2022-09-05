import { Context, Encoding, Ser } from "../types";
import { pack } from "./pack";
import { packSize } from "./size";
import { unpack } from "./unpack";

export function packArray(
  ctx: Context,
  data: unknown[],
  floatHead: number,
  float: Ser<number>,
  str: Ser<string>
) {
  const { length } = data;
  packSize(ctx, length, 0x90, 0xdc);
  for (let i = 0; i < length; i++) {
    pack(ctx, data[i], floatHead, float, str);
  }
}

export function unpackArrayBody(
  ctx: Context,
  size: number,
  encoding: Encoding<string>
) {
  const data = new Array<unknown>(size);
  for (let i = 0; i < size; i++) {
    data[i] = unpack(ctx, encoding);
  }
  return data;
}
