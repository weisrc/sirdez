import { define } from "../define";
import { float32, float64, string } from "..";
// import { ClazzSerdes } from "../serdes";
import { Encoding } from "../types";
import { pack } from "./pack";
import { strSize } from "./size";
import { unpack } from "./unpack";

export const msgpack = (
  encoding: Encoding<string>,
  single = false
  // ...exts: [number, ClazzSerdes<unknown>][]
) => {
  // const demap = new Map(exts);
  // const enmap = new Map(exts.map(([type, ext]) => [ext.clazz, type]));
  const { ser: float } = single ? float32 : float64;
  const head = single ? 0xca : 0xcb;
  const { ser: str } = string(encoding, strSize);
  return define<unknown>(
    (ctx, data) => pack(ctx, data, head, float, str),
    (ctx) => unpack(ctx, encoding)
  );
};
