import { createContext, string, uint8, utf8 } from "../../src";

const ctx = createContext();

const serdes = string(utf8, uint8);

beforeEach(() => {
  ctx.i = 0;
});

test("string encode", () => {
  serdes.ser(ctx, "hello");
  expect(ctx.bytes[0]).toBe(5);
  expect(ctx.i).toBe(6);
});

test("string decode", () => {
  expect(serdes.des(ctx)).toBe("hello");
  expect(ctx.i).toBe(6);
});
