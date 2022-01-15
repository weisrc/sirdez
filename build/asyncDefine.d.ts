import { AsyncDes, AsyncSer, AsyncSerDes } from "./types";
export declare function asyncDefine<T>(ser: AsyncSer<T>, des: AsyncDes<T>): AsyncSerDes<T>;
