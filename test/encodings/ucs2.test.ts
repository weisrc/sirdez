import { createContext, ucs2 } from "../../src";
import { text } from "../fixtures/text";

const ctx = createContext(20000);

beforeEach(() => {
  ctx.i = 0;
});

test("ucs2", () => {
  ucs2.encode(ctx, text);
  const end = ctx.i;
  ctx.i = 0;
  expect(ucs2.decode(ctx, end)).toBe(text);
});
