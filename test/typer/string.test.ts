import { createContext, string, uint8, utf8 } from "../../src";

const ctx = createContext();

const typer = string(utf8, uint8);

beforeEach(() => {
  ctx.i = 0;
});

test("string encode", () => {
  typer.encode(ctx, "hello");
  expect(ctx.bytes[0]).toBe(5);
  expect(ctx.i).toBe(6);
});

test("string decode", () => {
  expect(typer.decode(ctx)).toBe("hello");
  expect(ctx.i).toBe(6);
});
