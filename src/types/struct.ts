import { SerDes, AsyncSerDes } from ".";

export type Struct = Record<string | number, unknown> | unknown[];

export type StructDefinition<T extends Struct> = {
  [k in keyof T]: SerDes<T[k]>;
};

export type AsyncStructDefinition<T extends Struct> = {
  [k in keyof T]: AsyncSerDes<T[k]> | SerDes<T[k]>;
};
