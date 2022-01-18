import { Context, Des, Ser } from "./types";
export declare function createContext(size?: number): Context;
export declare function growContext(ctx: Context): void;
export declare function contextSer<T>(ctx: Context, ser: Ser<T>, data: T): Uint8Array;
export declare function contextDes<T>(ctx: Context, des: Des<T>, bytes: Uint8Array): T;
export declare function contextFromBytes(array: Uint8Array): Context;
