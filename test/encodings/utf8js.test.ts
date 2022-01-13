import { createContext, utf8, utf8js } from "../../src";
import { text } from "../fixtures/text";

const ctx = createContext(20000);

beforeEach(() => {
  ctx.i = 0;
});

test("utf8js encode complies", () => {
  utf8js.encode(ctx, text);
  const end = ctx.i;
  ctx.i = 0;
  expect(utf8.decode(ctx, end)).toBe(text);
});

test("utf8js decode complies", () => {
  utf8.encode(ctx, text);
  const end = ctx.i;
  ctx.i = 0;
  expect(utf8js.decode(ctx, end)).toBe(text);
});

test("utf8js", () => {
  utf8.encode(ctx, text);
  const end = ctx.i;
  ctx.i = 0;
  expect(utf8.decode(ctx, end)).toBe(text);
});
