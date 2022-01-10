import { Context } from ".";
export interface Typer<T> {
    encode(ctx: Context, data: T): void;
    decode(ctx: Context): T;
}
export interface AsyncTyper<T> {
    encode(ctx: Context, data: T): Promise<void>;
    decode(ctx: Context): Promise<T>;
}
export declare type Sequencer<T> = {
    encode(ctx: Context, data: T): void;
    decode(ctx: Context, end: number): T;
};
export interface Converter<T> {
    encode(data: T): Uint8Array;
    decode(array: Uint8Array): T;
}
export interface AsyncConverter<T> {
    encode(data: T): Promise<Uint8Array>;
    decode(array: Uint8Array): Promise<T>;
}
