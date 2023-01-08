import { Context, Encoding, Ser } from "../types";
export declare function packMap(ctx: Context, data: Record<string | number, unknown>, floatHead: number, float: Ser<number>, str: Ser<string>): void;
export declare function unpackMapBody(ctx: Context, size: number, encoding: Encoding<string>): Record<string, unknown>;
