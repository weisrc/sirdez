import { createContext, utf8 } from "../../src";
import { text } from "../fixture/text";

const ctx = createContext(20000);

beforeEach(() => {
  ctx.i = 0;
});

test("utf8", () => {
  utf8.encode(ctx, text);
  const end = ctx.i;
  ctx.i = 0;
  expect(utf8.decode(ctx, end)).toBe(text);
});
