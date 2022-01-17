import { createContext, ucs2 } from "../../src";
import { text } from "../fixtures/text";
import { ucs2 as nodeUcs2 } from "../../src/node";

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

test("ucs2@node", () => {
  nodeUcs2.encode(ctx, text);
  const end = ctx.i;
  ctx.i = 0;
  expect(nodeUcs2.decode(ctx, end)).toBe(text);
});
