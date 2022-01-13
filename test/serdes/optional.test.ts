import { createContext, optional, uint8 } from "../../src";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

const serdes = optional(uint8);

test("optional encode with value", () => {
  serdes.ser(ctx, 100);
  expect(ctx.bytes[0]).toBe(1);
  expect(ctx.i).toBe(2);
});

test("optional decode with value", () => {
  expect(serdes.des(ctx)).toBe(100);
  expect(ctx.i).toBe(2);
});

test("optional encode without value", () => {
  serdes.ser(ctx, undefined);
  expect(ctx.bytes[0]).toBe(0);
  expect(ctx.i).toBe(1);
});

test("optional decode without value", () => {
  expect(serdes.des(ctx)).toBe(undefined);
  expect(ctx.i).toBe(1);
});
