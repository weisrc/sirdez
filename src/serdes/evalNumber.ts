import { define } from "../define";
import { NumberFactory } from "../types";

export const evalNumber: NumberFactory = (kind, bitSize) => {
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

export const evalUint8 = evalNumber("uint", 8);
export const evalUint16 = evalNumber("uint", 16);
export const evalUint32 = evalNumber("uint", 32);
export const evalInt8 = evalNumber("int", 8);
export const evalInt16 = evalNumber("int", 16);
export const evalInt32 = evalNumber("int", 32);
export const evalBigUint64 = evalNumber("bigUint", 64);
export const evalBigInt64 = evalNumber("bigInt", 64);
export const evalFloat32 = evalNumber("float", 32);
export const evalFloat64 = evalNumber("float", 64);
