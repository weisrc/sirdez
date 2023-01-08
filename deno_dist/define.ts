import { Des, Ser, Serdes } from "./types/index.ts";

export function define<T>(ser: Ser<T>, des: Des<T>): Serdes<T> {
  return { ser, des };
}
