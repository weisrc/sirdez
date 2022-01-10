import { Typer, AsyncTyper } from ".";
export declare type Struct = Record<string | number, unknown> | unknown[];
export declare type TyperStruct<T extends Struct> = {
    [k in keyof T]: Typer<T[k]>;
};
export declare type AsyncTyperStruct<T extends Struct> = {
    [k in keyof T]: AsyncTyper<T[k]> | Typer<T[k]>;
};
