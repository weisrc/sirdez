import { decodeFromArray } from ".";
import { createContext, encodeIntoContext } from "./context";
import { ConverterMaker } from "./types";

export const use: ConverterMaker = (typer) => {
  const ctx = createContext();
  return {
    encode(data) {
      encodeIntoContext(ctx, typer, data);
      return ctx.bytes.slice(0, ctx.i);
    },
    instantEncode(data) {
      encodeIntoContext(ctx, typer, data);
      return ctx.bytes.subarray(0, ctx.i);
    },
    decode(array: Uint8Array) {
      return decodeFromArray(ctx, typer, array);
    }
  };
};
