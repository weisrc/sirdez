import { Des, Ser, Serdes } from "./types";
export declare function define<T>(ser: Ser<T>, des: Des<T>): Serdes<T>;
