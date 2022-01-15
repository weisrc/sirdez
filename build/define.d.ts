import { Des, SerDes, Ser } from "./types";
export declare function define<T>(ser: Ser<T>, des: Des<T>): SerDes<T>;
