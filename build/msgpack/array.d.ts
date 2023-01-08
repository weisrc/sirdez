import { Context, Encoding, Ser } from "../types";
export declare function packArray(ctx: Context, data: unknown[], floatHead: number, float: Ser<number>, str: Ser<string>): void;
export declare function unpackArrayBody(ctx: Context, size: number, encoding: Encoding<string>): unknown[];
