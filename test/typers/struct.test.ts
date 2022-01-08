import {
  createContext,
  string,
  struct,
  tuple,
  TypeOf,
  uint8,
  utf8
} from "../../src";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

{
  const data = { name: "Alice", age: 100 };

  const typer = struct({
    name: string(utf8, uint8),
    age: uint8
  });

  test("struct encode", () => {
    typer.encode(ctx, data);
    expect(ctx.i).toBe(7);
  });

  test("struct decode", () => {
    expect(typer.decode(ctx)).toEqual(data);
    expect(ctx.i).toBe(7);
  });
}

{
  const typer = tuple(string(utf8, uint8), uint8);
  const data: TypeOf<typeof typer> = ["Alice", 123];

  test("tuple encode", () => {
    typer.encode(ctx, data);
    expect(ctx.i).toBe(7);
  });

  test("tuple decode", () => {
    expect(typer.decode(ctx)).toEqual(data);
    expect(ctx.i).toBe(7);
  });
}
