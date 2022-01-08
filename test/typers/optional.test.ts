import { createContext, optional, uint8 } from "../../src";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

const typer = optional(uint8);

test("optional encode with value", () => {
  typer.encode(ctx, 100);
  expect(ctx.bytes[0]).toBe(1);
  expect(ctx.i).toBe(2);
});

test("optional decode with value", () => {
  expect(typer.decode(ctx)).toBe(100);
  expect(ctx.i).toBe(2);
});

test("optional encode without value", () => {
  typer.encode(ctx, undefined);
  expect(ctx.bytes[0]).toBe(0);
  expect(ctx.i).toBe(1);
});

test("optional decode without value", () => {
  expect(typer.decode(ctx)).toBe(undefined);
  expect(ctx.i).toBe(1);
});
