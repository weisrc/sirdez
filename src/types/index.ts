import { AsyncSerDes, SerDes } from "./serdes";

export * from "./maker";
export * from "./serdes";
export * from "./struct";

export interface Context {
  i: number;
  view: DataView;
  bytes: Uint8Array;
}

export type GetType<T> = T extends AsyncSerDes<infer A>
  ? A
  : T extends SerDes<infer B>
  ? B
  : never;
