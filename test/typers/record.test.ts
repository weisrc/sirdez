import {
  createContext,
  record,
  string,
  uint8,
  utf8
} from "../../src";

const ctx = createContext();

const typer = record(uint8, uint8, string(utf8, uint8));

beforeEach(() => {
  ctx.i = 0;
});

const data = { hello: 123, test: 200 };

test("record encode", () => {
  typer.encode(ctx, data);
  expect(ctx.bytes[0]).toBe(2);
  expect(ctx.i).toBe(14);
});

test("record decode", () => {
  expect(typer.decode(ctx)).toEqual(data);
  expect(ctx.i).toBe(14);
});
