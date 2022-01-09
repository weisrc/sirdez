import { NumberMaker } from "../../types";

export const number: NumberMaker = (kind, size) => {
  const name = kind[0].toUpperCase() + kind.slice(1) + size;
  const offset = size / 8;
  return new Function(
    `return {encode(c,d){c.view.set${name}(c.i,d);c.i+=${offset}},decode(c){const d=c.view.get${name}(c.i);c.i+=${offset};return d}}`
  )();
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
