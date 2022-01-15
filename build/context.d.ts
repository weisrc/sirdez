import { AsyncSer, Context, Des, Ser } from "./types";
export declare function createContext(size?: number): Context;
export declare function growContext(ctx: Context): void;
export declare function contextSer<T>(ctx: Context, ser: Ser<T>, data: T): void;
export declare function asyncContextSer<T>(ctx: Context, ser: AsyncSer<T>, data: T): Promise<void>;
export declare function contextDes<T>(ctx: Context, des: Des<T>, buf: Uint8Array): T;
export declare function contextFromBytes(array: Uint8Array): Context;
