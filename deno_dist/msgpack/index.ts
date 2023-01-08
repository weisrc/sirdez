import { define } from "../define.ts";
import { float32, float64, string } from "../index.ts";
// import { ClazzSerdes } from "../serdes/index.ts";
import { Encoding } from "../types/index.ts";
import { pack } from "./pack.ts";
import { strSize } from "./size.ts";
import { unpack } from "./unpack.ts";

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
