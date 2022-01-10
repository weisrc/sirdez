import { Struct, TyperStruct, Typer, Sequencer, AsyncTyper, AsyncTyperStruct } from ".";
declare type IntKind = "uint" | "int";
declare type IntSize = 8 | 16 | 32;
declare type FloatKind = "float";
declare type FloatSize = 32 | 64;
declare type BigIntKind = "bigInt" | "bigUint";
declare type BigIntSize = 64;
declare type Kind = IntKind | FloatKind | BigIntKind;
declare type Size = IntSize | FloatSize | BigIntSize;
export interface NumberMaker {
    (kind: IntKind, size: IntSize): Typer<number>;
    (kind: FloatKind, size: FloatSize): Typer<number>;
    (kind: BigIntKind, size: BigIntSize): Typer<bigint>;
    (kind: Kind, size: Size): Typer<never>;
}
export declare type StringMaker = (sequencer: Sequencer<string>, header: Typer<number>) => Typer<string>;
export declare type BytesMaker = (header: Typer<number>) => Typer<Uint8Array>;
export declare type StructMaker = <T extends Struct>(definition: TyperStruct<T>) => Typer<T>;
export declare type TupleMaker = <T extends unknown[]>(...definition: TyperStruct<T>) => Typer<T>;
export declare type AsyncStructMaker = <T extends Struct>(definition: AsyncTyperStruct<T>) => AsyncTyper<T>;
export declare type AsyncTupleMaker = <T extends unknown[]>(...definition: AsyncTyperStruct<T>) => AsyncTyper<T>;
export declare type RecordMaker = <T>(typer: Typer<T>, header: Typer<number>, keyer: Typer<string>) => Typer<Record<string, T>>;
export declare type AsyncRecordMaker = <T>(typer: AsyncTyper<T>, header: Typer<number>, keyer: Typer<string>) => AsyncTyper<Record<string, T>>;
export declare type ArrayMaker = <T>(typer: Typer<T>, header: Typer<number>) => Typer<T[]>;
export declare type AsyncArrayMaker = <T>(typer: AsyncTyper<T>, header: Typer<number>) => AsyncTyper<T[]>;
export declare type OptionalMaker = <T>(typer: Typer<T | void>) => Typer<T | void>;
export declare type AsyncOptionalMaker = <T>(typer: AsyncTyper<T | void>) => AsyncTyper<T | void>;
export {};
