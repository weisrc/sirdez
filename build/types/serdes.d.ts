export interface Context {
    i: number;
    view: DataView;
    bytes: Uint8Array;
}
export declare type GetType<T> = T extends Serdes<infer X> ? X : never;
export declare type Ser<T> = (ctx: Context, data: T) => void;
export declare type Des<T> = (ctx: Context) => T;
export interface Serdes<T> {
    ser: Ser<T>;
    des: Des<T>;
}
export interface UsableSerdes<T> extends Serdes<T> {
    toBytes: (data: T) => Uint8Array;
    toUnsafeBytes: (data: T) => Uint8Array;
    fromBytes: (buf: Uint8Array) => T;
}
export declare type Encoding<T> = {
    encode(ctx: Context, data: T): void;
    decode(ctx: Context, size: number): T;
};
