import { ascii, createContext } from "../../src";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

const data =
  "Hello world, I am made using characters that ascii supports!";

test("ascii", () => {
  ascii.encode(ctx, data);
  const end = ctx.i;
  ctx.i = 0;
  expect(ascii.decode(ctx, end)).toBe(data);
});
