import { Context } from ".";

export type Ser<T> = (ctx: Context, data: T) => void;
export type Des<T> = (ctx: Context) => T;

export interface SerDes<T> {
  ser: Ser<T>;
  des: Des<T>;
  toBytes: (data: T) => Uint8Array;
  toTempBytes: (data: T) => Uint8Array;
  fromBytes: (buf: Uint8Array) => T;
}

export type AsyncSer<T> = (ctx: Context, data: T) => Promise<void>;
export type AsyncDes<T> = (ctx: Context) => Promise<T>;

export interface AsyncSerDes<T> {
  ser: AsyncSer<T>;
  des: AsyncDes<T>;
  toBytes: (data: T) => Promise<Uint8Array>;
  toTempBytes: (data: T) => Promise<Uint8Array>;
  fromBytes: (buf: Uint8Array) => Promise<T>;
}

export type Encoding<T> = {
  encode(ctx: Context, data: T): void;
  decode(ctx: Context, end: number): T;
};
