import { define } from "../define";
import { NumberFactory } from "../types";

export const number: NumberFactory = (kind, bitSize) => {
  const name =
    /*@__PURE__*/ kind[0].toUpperCase() +
    /*@__PURE__*/ kind.slice(1) +
    bitSize;
  const size = bitSize / 8;
  return /*@__PURE__*/ new Function(
    "d",
    `return d((c,d)=>{c.view.set${name}(c.i,d);c.i+=${size}},(c)=>{const d=c.view.get${name}(c.i);c.i+=${size};return d})`
  )(define);
};

export const uint8 = number("uint", 8);
export const uint16 = number("uint", 16);
export const uint32 = number("uint", 32);
export const int8 = number("int", 8);
export const int16 = number("int", 16);
export const int32 = number("int", 32);
export const bigUint64 = number("bigUint", 64);
export const bigInt64 = number("bigInt", 64);
export const float32 = number("float", 32);
export const float64 = number("float", 64);
