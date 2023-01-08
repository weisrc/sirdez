import { Encoding, Serdes } from ".";
declare type IntKind = "uint" | "int";
declare type IntSize = 8 | 16 | 32;
declare type FloatKind = "float";
declare type FloatSize = 32 | 64;
declare type BigIntKind = "bigInt" | "bigUint";
declare type BigIntSize = 64;
declare type Kind = IntKind | FloatKind | BigIntKind;
declare type Size = IntSize | FloatSize | BigIntSize;
export interface NumberFactory {
    (kind: IntKind, bitSize: IntSize): Serdes<number>;
    (kind: FloatKind, bitSize: FloatSize): Serdes<number>;
    (kind: BigIntKind, bitSize: BigIntSize): Serdes<bigint>;
    (kind: Kind, bitSize: Size): Serdes<never>;
}
export declare type StringFactory = (encoding: Encoding<string>, headSd: Serdes<number>) => Serdes<string>;
export declare type BytesFactory = (headSd: Serdes<number>) => Serdes<Uint8Array>;
export declare type Struct = Record<string | number, unknown> | unknown[];
export declare type StructDefinition<T extends Struct> = {
    [k in keyof T]: Serdes<T[k]>;
};
export declare type StructFactory = <T extends Struct>(definition: StructDefinition<T>) => Serdes<T>;
export declare type TupleFactory = <T extends unknown[]>(...definition: StructDefinition<T>) => Serdes<T>;
export declare type MapFactory = <T>(keySd: Serdes<string>, valueSd: Serdes<T>, headSd: Serdes<number>) => Serdes<Record<string, T>>;
export declare type ArrayFactory = <T>(sd: Serdes<T>, headSd: Serdes<number>) => Serdes<T[]>;
export declare type OptionalFactory = <T>(sd: Serdes<T>) => Serdes<T | void>;
export declare type OneOfMap<T> = {
    [K in keyof T]: {
        type: K;
        value: T[K];
    };
};
export declare type ValueOf<T> = T[keyof T];
export declare type OneOf<T> = ValueOf<OneOfMap<T>>;
export declare type OneOfFactory = <T extends Record<string | number | symbol, unknown>>(headSd: Serdes<number>, definition: StructDefinition<T>) => Serdes<OneOf<T>>;
export {};
