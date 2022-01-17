import { latin1, createContext } from "../../src";
import { latin1 as nodeLatin1 } from "../../src/node";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

const data =
  "Hello world, I am made using characters that latin1 supports!";

test("latin1", () => {
  latin1.encode(ctx, data);
  const end = ctx.i;
  ctx.i = 0;
  expect(latin1.decode(ctx, end)).toBe(data);
});

test("latin1@node", () => {
  nodeLatin1.encode(ctx, data);
  const end = ctx.i;
  ctx.i = 0;
  expect(nodeLatin1.decode(ctx, end)).toBe(data);
});
