import { Typer, AsyncTyper } from "./index.ts";

export type Struct = Record<string | number, unknown> | unknown[];

export type TyperStruct<T extends Struct> = {
  [k in keyof T]: Typer<T[k]>;
};

export type AsyncTyperStruct<T extends Struct> = {
  [k in keyof T]: AsyncTyper<T[k]> | Typer<T[k]>;
};
