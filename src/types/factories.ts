import { Encoding, SerDes } from ".";

type IntKind = "uint" | "int";
type IntSize = 8 | 16 | 32;

type FloatKind = "float";
type FloatSize = 32 | 64;

type BigIntKind = "bigInt" | "bigUint";
type BigIntSize = 64;

type Kind = IntKind | FloatKind | BigIntKind;
type Size = IntSize | FloatSize | BigIntSize;

export interface NumberFactory {
  (kind: IntKind, bitSize: IntSize): SerDes<number>;
  (kind: FloatKind, bitSize: FloatSize): SerDes<number>;
  (kind: BigIntKind, bitSize: BigIntSize): SerDes<bigint>;
  (kind: Kind, bitSize: Size): SerDes<never>;
}

export type StringFactory = (
  encoding: Encoding<string>,
  headSd: SerDes<number>
) => SerDes<string>;

export type BytesFactory = (
  headSd: SerDes<number>
) => SerDes<Uint8Array>;

export type Struct = Record<string | number, unknown> | unknown[];

export type StructDefinition<T extends Struct> = {
  [k in keyof T]: SerDes<T[k]>;
};

export type StructFactory = <T extends Struct>(
  definition: StructDefinition<T>
) => SerDes<T>;

export type TupleFactory = <T extends unknown[]>(
  ...definition: StructDefinition<T>
) => SerDes<T>;

export type RecordFactory = <T>(
  sd: SerDes<T>,
  headSd: SerDes<number>,
  keySd: SerDes<string>
) => SerDes<Record<string, T>>;

export type ArrayFactory = <T>(
  sd: SerDes<T>,
  headSd: SerDes<number>
) => SerDes<T[]>;

export type OptionalFactory = <T>(sd: SerDes<T>) => SerDes<T | void>;
