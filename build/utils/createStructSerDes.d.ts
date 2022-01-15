import { AsyncStructDefinition, Struct, StructDefinition, AsyncSerDes, SerDes } from "../types";
export declare function createStructSerDes<T extends Struct, Async extends boolean>(definition: Async extends true ? AsyncStructDefinition<T> : StructDefinition<T>, async: Async): Async extends true ? AsyncSerDes<T> : SerDes<T>;
