import { createContext, utf8 } from "../../src";
import { text } from "../fixtures/text";
import { utf8 as nodeUtf8 } from "../../src/node";

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

test("utf8@node", () => {
  nodeUtf8.encode(ctx, text);
  const end = ctx.i;
  ctx.i = 0;
  expect(nodeUtf8.decode(ctx, end)).toBe(text);
});
