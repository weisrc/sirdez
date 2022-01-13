import { bytes, createContext, uint8 } from "../../src";

const ctx = createContext();

const serdes = bytes(uint8);

beforeEach(() => {
  ctx.i = 0;
});

const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

test("bytes encode", () => {
  serdes.ser(ctx, data);
  expect(ctx.bytes[0]).toBe(10);
  expect(ctx.i).toBe(11);
});

test("bytes decode", () => {
  expect(serdes.des(ctx)).toEqual(data);
  expect(ctx.i).toBe(11);
});
