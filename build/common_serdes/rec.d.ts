import { Serdes } from "../types";
export declare type RecFactory = <T>(sd: () => Serdes<T>) => Serdes<T>;
export declare const rec: RecFactory;
