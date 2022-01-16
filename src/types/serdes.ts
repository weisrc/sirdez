export interface Context {
  i: number;
  view: DataView;
  bytes: Uint8Array;
}

export type GetType<T> = T extends SerDes<infer X> ? X : never;

export type Ser<T> = (ctx: Context, data: T) => void;
export type Des<T> = (ctx: Context) => T;

export interface SerDes<T> {
  ser: Ser<T>;
  des: Des<T>;
}

export interface UsableSerDes<T> extends SerDes<T> {
  toBytes: (data: T) => Uint8Array;
  toUnsafeBytes: (data: T) => Uint8Array;
  fromBytes: (buf: Uint8Array) => T;
}

export type Encoding<T> = {
  encode(ctx: Context, data: T): void;
  decode(ctx: Context, end: number): T;
};
