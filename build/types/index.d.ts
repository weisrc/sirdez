import { AsyncTyper, Typer } from "./serdes";
export * from "./maker";
export * from "./serdes";
export * from "./struct";
export interface Context {
    i: number;
    view: DataView;
    bytes: Uint8Array;
}
export declare type TypeOfTyper<T> = T extends Typer<infer X> ? X : never;
export declare type TypeOfAsyncTyper<T> = T extends AsyncTyper<infer X> ? X : never;
export declare type TypeOf<T> = T extends AsyncTyper<infer X> ? X : TypeOfTyper<T>;
