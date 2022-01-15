import { AsyncSerDes, AsyncStructDefinition, Encoding, SerDes, Struct, StructDefinition } from ".";
declare type IntKind = "uint" | "int";
declare type IntSize = 8 | 16 | 32;
declare type FloatKind = "float";
declare type FloatSize = 32 | 64;
declare type BigIntKind = "bigInt" | "bigUint";
declare type BigIntSize = 64;
declare type Kind = IntKind | FloatKind | BigIntKind;
declare type Size = IntSize | FloatSize | BigIntSize;
export interface NumberFactory {
    (kind: IntKind, bitSize: IntSize): SerDes<number>;
    (kind: FloatKind, bitSize: FloatSize): SerDes<number>;
    (kind: BigIntKind, bitSize: BigIntSize): SerDes<bigint>;
    (kind: Kind, bitSize: Size): SerDes<never>;
}
export declare type StringFactory = (encoding: Encoding<string>, headSd: SerDes<number>) => SerDes<string>;
export declare type BytesFactory = (headSd: SerDes<number>) => SerDes<Uint8Array>;
export declare type StructFactory = <T extends Struct>(definition: StructDefinition<T>) => SerDes<T>;
export declare type TupleFactory = <T extends unknown[]>(...definition: StructDefinition<T>) => SerDes<T>;
export declare type AsyncStructFactory = <T extends Struct>(definition: AsyncStructDefinition<T>) => AsyncSerDes<T>;
export declare type AsyncTupleFactory = <T extends unknown[]>(...definition: AsyncStructDefinition<T>) => AsyncSerDes<T>;
export declare type RecordFactory = <T>(sd: SerDes<T>, headSd: SerDes<number>, keySd: SerDes<string>) => SerDes<Record<string, T>>;
export declare type AsyncRecordFactory = <T>(sd: AsyncSerDes<T>, headSd: SerDes<number>, keySd: SerDes<string>) => AsyncSerDes<Record<string, T>>;
export declare type ArrayFactory = <T>(sd: SerDes<T>, headSd: SerDes<number>) => SerDes<T[]>;
export declare type AsyncArrayFactory = <T>(sd: AsyncSerDes<T>, headSd: SerDes<number>) => AsyncSerDes<T[]>;
export declare type OptionalFactory = <T>(sd: SerDes<T>) => SerDes<T | void>;
export declare type AsyncOptionalFactory = <T>(sd: AsyncSerDes<T>) => AsyncSerDes<T | void>;
export {};
