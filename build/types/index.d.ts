import { AsyncSerDes, SerDes } from "./serdes";
export * from "./factories";
export * from "./serdes";
export * from "./struct";
export interface Context {
    i: number;
    view: DataView;
    bytes: Uint8Array;
}
export declare type GetType<T> = T extends AsyncSerDes<infer A> ? A : T extends SerDes<infer B> ? B : never;
