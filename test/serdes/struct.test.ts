import {
  createContext,
  GetType,
  string,
  struct,
  StructFactory,
  tuple,
  TupleFactory,
  uint8,
  utf8
} from "../../src";

import {
  struct as evalStruct,
  tuple as evalTuple
} from "../../src/eval";

function testStruct(struct: StructFactory, name: string) {
  const ctx = createContext();
  const data = { name: "Alice", age: 100 };

  const typer = struct({
    name: string(utf8, uint8),
    age: uint8
  });

  test(name + " encode", () => {
    typer.ser(ctx, data);
    expect(ctx.i).toBe(7);
  });

  test(name + " decode", () => {
    ctx.i = 0;
    expect(typer.des(ctx)).toEqual(data);
    expect(ctx.i).toBe(7);
  });
}

function testTuple(tuple: TupleFactory, name: string) {
  const ctx = createContext();
  const typer = tuple(string(utf8, uint8), uint8);
  const data: GetType<typeof typer> = ["Alice", 123];

  test(name + " encode", () => {
    typer.ser(ctx, data);
    expect(ctx.i).toBe(7);
  });

  test(name + " decode", () => {
    ctx.i = 0;
    expect(typer.des(ctx)).toEqual(data);
    expect(ctx.i).toBe(7);
  });
}

testStruct(struct, "struct");
testTuple(tuple, "tuple");

testStruct(evalStruct, "struct@eval");
testTuple(evalTuple, "tuple@eval");
