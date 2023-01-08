import { Serdes, UsableSerdes } from ".";
export declare function use<T>({ ser, des }: Serdes<T>, size?: number): UsableSerdes<T>;
