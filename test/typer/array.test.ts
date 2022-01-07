import { array, createContext, uint8 } from "../../src";

const ctx = createContext();

const typer = array(uint8, uint8);

beforeEach(() => {
  ctx.i = 0;
});

test("array encode", () => {
  typer.encode(ctx, [1, 2, 3]);
  expect(ctx.bytes[0]).toBe(3);
  expect(ctx.i).toBe(4);
});

test("array decode", () => {
  expect(typer.decode(ctx)).toEqual([1, 2, 3]);
  expect(ctx.i).toBe(4);
});
