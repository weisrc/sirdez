import { AsyncSerDes, SerDes } from "./serdes.ts";

export * from "./factories.ts";
export * from "./serdes.ts";
export * from "./struct.ts";

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
