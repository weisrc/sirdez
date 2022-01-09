import {
  createContext,
  codegen,
  string,
  struct,
  StructMaker,
  tuple,
  TupleMaker,
  TypeOf,
  uint8,
  utf8
} from "../../src";

function testStruct(struct: StructMaker, name: string) {
  const ctx = createContext();
  const data = { name: "Alice", age: 100 };

  const typer = struct({
    name: string(utf8, uint8),
    age: uint8
  });

  test(name + " encode", () => {
    typer.encode(ctx, data);
    expect(ctx.i).toBe(7);
  });

  test(name + " decode", () => {
    ctx.i = 0;
    expect(typer.decode(ctx)).toEqual(data);
    expect(ctx.i).toBe(7);
  });
}

function testTuple(tuple: TupleMaker, name: string) {
  const ctx = createContext();
  const typer = tuple(string(utf8, uint8), uint8);
  const data: TypeOf<typeof typer> = ["Alice", 123];

  test(name + " encode", () => {
    typer.encode(ctx, data);
    expect(ctx.i).toBe(7);
  });

  test(name + " decode", () => {
    ctx.i = 0;
    expect(typer.decode(ctx)).toEqual(data);
    expect(ctx.i).toBe(7);
  });
}

testStruct(struct, "struct");
testTuple(tuple, "tuple");

testStruct(codegen.struct, "eval.struct");
testTuple(codegen.tuple, "eval.tuple");
