import { Encoding, Serdes } from "./index.ts";

type IntKind = "uint" | "int";
type IntSize = 8 | 16 | 32;

type FloatKind = "float";
type FloatSize = 32 | 64;

type BigIntKind = "bigInt" | "bigUint";
type BigIntSize = 64;

type Kind = IntKind | FloatKind | BigIntKind;
type Size = IntSize | FloatSize | BigIntSize;

export interface NumberFactory {
  (kind: IntKind, bitSize: IntSize): Serdes<number>;
  (kind: FloatKind, bitSize: FloatSize): Serdes<number>;
  (kind: BigIntKind, bitSize: BigIntSize): Serdes<bigint>;
  (kind: Kind, bitSize: Size): Serdes<never>;
}

export type StringFactory = (
  encoding: Encoding<string>,
  headSd: Serdes<number>
) => Serdes<string>;

export type BytesFactory = (
  headSd: Serdes<number>
) => Serdes<Uint8Array>;

export type Struct = Record<string | number, unknown> | unknown[];

export type StructDefinition<T extends Struct> = {
  [k in keyof T]: Serdes<T[k]>;
};

export type StructFactory = <T extends Struct>(
  definition: StructDefinition<T>
) => Serdes<T>;

export type TupleFactory = <T extends unknown[]>(
  ...definition: StructDefinition<T>
) => Serdes<T>;

export type MapFactory = <T>(
  keySd: Serdes<string>,
  valueSd: Serdes<T>,
  headSd: Serdes<number>
) => Serdes<Record<string, T>>;

export type ArrayFactory = <T>(
  sd: Serdes<T>,
  headSd: Serdes<number>
) => Serdes<T[]>;

export type OptionalFactory = <T>(sd: Serdes<T>) => Serdes<T | void>;
