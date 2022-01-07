export interface Context {
  i: number;
  view: DataView;
  bytes: Uint8Array;
}

export interface Typer<T> {
  encode(ctx: Context, data: T): void;
  decode(ctx: Context): T;
}

export interface AsyncTyper<T> {
  encode(ctx: Context, data: T): Promise<void>;
  decode(ctx: Context): Promise<T>;
}

export type Sequencer<T> = {
  encode(ctx: Context, data: T): void;
  decode(ctx: Context, end: number): T;
};

export interface Converter<T> {
  encode(data: T): Uint8Array;
  decode(array: Uint8Array): T;
}

export interface AsyncConverter<T> {
  encode(data: T): Promise<Uint8Array>;
  decode(array: Uint8Array): Promise<T>;
}

export type TypeOf<T extends Typer<unknown>> = T extends Typer<
  infer X
>
  ? X
  : never;

export type Struct = Record<string | number, unknown> | unknown[];

export type TyperStruct<T extends Struct> = {
  [k in keyof T]: Typer<T[k]>;
};

export type AsyncTyperStruct<T extends Struct> = {
  [k in keyof T]: AsyncTyper<T[k]> | Typer<T[k]>;
};
