import { OneOfFactory } from "../types";
export declare class InvalidOneOfType extends Error {
    readonly type: number;
    constructor(type: number);
}
export declare const oneOf: OneOfFactory;
