import {
  Struct,
  TyperStruct,
  Typer,
  Sequencer,
  AsyncTyper,
  AsyncTyperStruct,
  Converter
} from ".";

type IntKind = "uint" | "int";
type IntSize = 8 | 16 | 32;

type FloatKind = "float";
type FloatSize = 32 | 64;

type BigIntKind = "bigInt" | "bigUint";
type BigIntSize = 64;

type Kind = IntKind | FloatKind | BigIntKind;
type Size = IntSize | FloatSize | BigIntSize;

export interface NumberMaker {
  (kind: IntKind, size: IntSize): Typer<number>;
  (kind: FloatKind, size: FloatSize): Typer<number>;
  (kind: BigIntKind, size: BigIntSize): Typer<bigint>;
  (kind: Kind, size: Size): Typer<never>;
}

export type StringMaker = (
  sequencer: Sequencer<string>,
  header: Typer<number>
) => Typer<string>;

export type BytesMaker = (header: Typer<number>) => Typer<Uint8Array>;

export type StructMaker = <T extends Struct>(
  definition: TyperStruct<T>
) => Typer<T>;

export type TupleMaker = <T extends unknown[]>(
  ...definition: TyperStruct<T>
) => Typer<T>;

export type AsyncStructMaker = <T extends Struct>(
  definition: AsyncTyperStruct<T>
) => AsyncTyper<T>;

export type AsyncTupleMaker = <T extends unknown[]>(
  ...definition: AsyncTyperStruct<T>
) => AsyncTyper<T>;

export type RecordMaker = <T>(
  typer: Typer<T>,
  header: Typer<number>,
  keyer: Typer<string>
) => Typer<Record<string, T>>;

export type AsyncRecordMaker = <T>(
  typer: AsyncTyper<T>,
  header: Typer<number>,
  keyer: Typer<string>
) => AsyncTyper<Record<string, T>>;

export type ArrayMaker = <T>(
  typer: Typer<T>,
  header: Typer<number>
) => Typer<T[]>;

export type AsyncArrayMaker = <T>(
  typer: AsyncTyper<T>,
  header: Typer<number>
) => AsyncTyper<T[]>;

export type OptionalMaker = <T>(
  typer: Typer<T | void>
) => Typer<T | void>;

export type AsyncOptionalMaker = <T>(
  typer: AsyncTyper<T | void>
) => AsyncTyper<T | void>;

export type ConverterMaker = <T>(type: Typer<T>) => Converter<T>;
