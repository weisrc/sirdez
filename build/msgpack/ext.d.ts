import { ClazzSerdes } from "../common_serdes";
interface Ext<T> extends ClazzSerdes<T> {
    id: number;
}
export declare function fixext<T>(id: number, serdes: ClazzSerdes<T>): Ext<T>;
export {};
