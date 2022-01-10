import { Context } from "./types";
export declare function createContext(size?: number): Context;
export declare function growContext(ctx: Context): void;
export declare function contextFromArray(array: Uint8Array): Context;
