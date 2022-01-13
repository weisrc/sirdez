import {
  AsyncSerDes,
  AsyncStructDefinition,
  Encoding,
  SerDes,
  Struct,
  StructDefinition
} from ".";

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
  format: Encoding<string>,
  headSd: SerDes<number>
) => SerDes<string>;

export type BytesFactory = (
  headSd: SerDes<number>
) => SerDes<Uint8Array>;

export type StructFactory = <T extends Struct>(
  definition: StructDefinition<T>
) => SerDes<T>;

export type TupleFactory = <T extends unknown[]>(
  ...definition: StructDefinition<T>
) => SerDes<T>;

export type AsyncStructFactory = <T extends Struct>(
  definition: AsyncStructDefinition<T>
) => AsyncSerDes<T>;

export type AsyncTupleFactory = <T extends unknown[]>(
  ...definition: AsyncStructDefinition<T>
) => AsyncSerDes<T>;

export type RecordFactory = <T>(
  sd: SerDes<T>,
  headSd: SerDes<number>,
  keySd: SerDes<string>
) => SerDes<Record<string, T>>;

export type AsyncRecordFactory = <T>(
  sd: AsyncSerDes<T>,
  headSd: SerDes<number>,
  keySd: SerDes<string>
) => AsyncSerDes<Record<string, T>>;

export type ArrayFactory = <T>(
  sd: SerDes<T>,
  headSd: SerDes<number>
) => SerDes<T[]>;

export type AsyncArrayFactory = <T>(
  sd: AsyncSerDes<T>,
  headSd: SerDes<number>
) => AsyncSerDes<T[]>;

export type OptionalFactory = <T>(sd: SerDes<T>) => SerDes<T | void>;

export type AsyncOptionalFactory = <T>(
  sd: AsyncSerDes<T>
) => AsyncSerDes<T | void>;
