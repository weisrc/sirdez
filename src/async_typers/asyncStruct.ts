import { AsyncTyper, AsyncTyperStruct, Struct } from "../types";
import { createStructTyper } from "../utils";

export function asyncStruct<T extends Struct>(
  definition: AsyncTyperStruct<T>
): AsyncTyper<T> {
  return createStructTyper(definition, true);
}

export function asyncTuple<T extends unknown[]>(
  ...definition: AsyncTyperStruct<T>
): AsyncTyper<T> {
  return asyncStruct(definition);
}
