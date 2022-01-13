import { boolean, createContext } from "../../src";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

test("boolean encode true", () => {
  boolean.ser(ctx, true);
  expect(ctx.bytes[0]).toBe(1);
  expect(ctx.i).toBe(1);
});

test("boolean decode true", () => {
  expect(boolean.des(ctx)).toEqual(true);
  expect(ctx.i).toBe(1);
});

test("boolean encode false", () => {
  boolean.ser(ctx, false);
  expect(ctx.bytes[0]).toBe(0);
  expect(ctx.i).toBe(1);
});

test("boolean decode false", () => {
  expect(boolean.des(ctx)).toEqual(false);
  expect(ctx.i).toBe(1);
});
