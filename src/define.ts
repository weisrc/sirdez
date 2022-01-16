import { Des, Ser, SerDes } from "./types";

export function define<T>(ser: Ser<T>, des: Des<T>): SerDes<T> {
  return { ser, des };
}
