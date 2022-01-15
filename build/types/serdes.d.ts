import { Context } from ".";
export declare type Ser<T> = (ctx: Context, data: T) => void;
export declare type Des<T> = (ctx: Context) => T;
export interface SerDes<T> {
    ser: Ser<T>;
    des: Des<T>;
    toBytes: (data: T) => Uint8Array;
    toTempBytes: (data: T) => Uint8Array;
    fromBytes: (buf: Uint8Array) => T;
}
export declare type AsyncSer<T> = (ctx: Context, data: T) => Promise<void>;
export declare type AsyncDes<T> = (ctx: Context) => Promise<T>;
export interface AsyncSerDes<T> {
    ser: AsyncSer<T>;
    des: AsyncDes<T>;
    toBytes: (data: T) => Promise<Uint8Array>;
    toTempBytes: (data: T) => Promise<Uint8Array>;
    fromBytes: (buf: Uint8Array) => Promise<T>;
}
export declare type Encoding<T> = {
    encode(ctx: Context, data: T): void;
    decode(ctx: Context, end: number): T;
};
