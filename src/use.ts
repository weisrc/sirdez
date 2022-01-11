import { Converter, Typer } from "./types";
import { unsafeUse } from "./unsafeUse";

export function use<T>(type: Typer<T>): Converter<T> {
  const { encode, decode } = unsafeUse(type);
  return {
    encode: (data) => encode(data).slice(),
    decode
  };
}
