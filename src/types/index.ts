import {
  AsyncTyper,
  Typer,
  Converter,
  AsyncConverter
} from "./serdes";

export * from "./maker";
export * from "./serdes";
export * from "./struct";

export interface Context {
  i: number;
  view: DataView;
  bytes: Uint8Array;
}

export type GetType<T> = T extends AsyncTyper<infer A>
  ? A
  : T extends Typer<infer B>
  ? B
  : T extends AsyncConverter<infer C>
  ? C
  : T extends Converter<infer D>
  ? D
  : never;
