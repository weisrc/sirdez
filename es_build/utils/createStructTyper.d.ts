import { AsyncTyperStruct, Struct, TyperStruct, AsyncTyper, Typer } from "../types";
export declare function createStructTyper<T extends Struct, Async extends boolean>(definition: Async extends true ? AsyncTyperStruct<T> : TyperStruct<T>, async: Async): Async extends true ? AsyncTyper<T> : Typer<T>;
