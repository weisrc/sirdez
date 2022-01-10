import { AsyncTyper, Typer } from "./serdes.ts";

export * from "./maker.ts";
export * from "./serdes.ts";
export * from "./struct.ts";

export interface Context {
  i: number;
  view: DataView;
  bytes: Uint8Array;
}

export type TypeOfTyper<T> = T extends Typer<infer X> ? X : never;

export type TypeOfAsyncTyper<T> = T extends AsyncTyper<infer X>
  ? X
  : never;

export type TypeOf<T> = T extends AsyncTyper<infer X>
  ? X
  : TypeOfTyper<T>;
