import { NumberMaker } from "../../types";

const number: NumberMaker = (kind, size) => {
  const name = kind + size * 8;
  return new Function(
    `return {encode(c,d){c.view.set${name}(ctx.i,d);ctx.i+=${size}},decode(c){const d=c.view.get${name}(ctx.i);ctx.i+=${size};return d}}`
  )();
};

export const uint8 = number("Uint", 1);
export const uint16 = number("Uint", 2);
export const uint32 = number("Uint", 4);
export const int8 = number("Int", 1);
export const int16 = number("Int", 2);
export const int32 = number("Int", 4);
export const bigUint64 = number("BigUint", 8);
export const bigInt64 = number("BigInt", 8);
export const float32 = number("Float", 4);
export const float64 = number("Float", 8);
