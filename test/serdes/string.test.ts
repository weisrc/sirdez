import { createContext, size, string, uint8, utf8 } from "../../src";

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

const sizeSerdes = string(utf8, size);

const sizeData = "😀".repeat(16);

test("string encode with size", () => {
  sizeSerdes.ser(ctx, sizeData);
  expect(ctx.i).toBe(66);
});

test("string decode with size", () => {
  expect(sizeSerdes.des(ctx)).toBe(sizeData);
  expect(ctx.i).toBe(66);
});
