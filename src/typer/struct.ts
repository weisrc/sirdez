import { Typer, Struct, TyperStruct } from "../types";
import { createStructTyper } from "../util";

export function struct<T extends Struct>(
  definition: TyperStruct<T>
): Typer<T> {
  return createStructTyper(definition, false);
}

export function tuple<T extends unknown[]>(
  ...definition: TyperStruct<T>
): Typer<T> {
  return struct(definition);
}
