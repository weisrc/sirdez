import { createContext, utf16 } from "../../src";
import { text } from "../fixture/text";

const ctx = createContext(20000);

beforeEach(() => {
  ctx.i = 0;
});

test("utf16", () => {
  utf16.encode(ctx, text);
  const end = ctx.i;
  ctx.i = 0;
  expect(utf16.decode(ctx, end)).toBe(text);
});
