import { SerDes, AsyncSerDes } from ".";
export declare type Struct = Record<string | number, unknown> | unknown[];
export declare type StructDefinition<T extends Struct> = {
    [k in keyof T]: SerDes<T[k]>;
};
export declare type AsyncStructDefinition<T extends Struct> = {
    [k in keyof T]: AsyncSerDes<T[k]> | SerDes<T[k]>;
};
