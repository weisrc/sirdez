import { Serdes } from "../types";
export interface ClazzSerdes<T> extends Serdes<T> {
    readonly clazz: {
        new (): T;
    };
}
export declare type ClazzFactory = <T, C extends T>(clazz: {
    new (): C;
}, sd: Serdes<T>) => ClazzSerdes<C>;
export declare const clazz: ClazzFactory;
