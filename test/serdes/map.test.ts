import { createContext, map, string, uint8, utf8 } from "../../src";

const ctx = createContext();

const serdes = map(string(utf8, uint8), uint8, uint8);

beforeEach(() => {
  ctx.i = 0;
});

const data = { hello: 123, test: 200 };

test("map encode", () => {
  serdes.ser(ctx, data);
  expect(ctx.bytes[0]).toBe(2);
  expect(ctx.i).toBe(14);
});

test("map decode", () => {
  expect(serdes.des(ctx)).toEqual(data);
  expect(ctx.i).toBe(14);
});
