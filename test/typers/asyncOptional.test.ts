import { createContext, asyncOptional } from "../../src";
import { asyncBoolean } from "./asyncBoolean";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

const typer = asyncOptional(asyncBoolean);

test("async.optional encode with value", async () => {
  await typer.encode(ctx, true);
  expect(ctx.bytes[0]).toBe(1);
  expect(ctx.i).toBe(2);
});

test("async.optional decode with value", async () => {
  expect(await typer.decode(ctx)).toBe(true);
  expect(ctx.i).toBe(2);
});

test("async.optional encode without value", async () => {
  await typer.encode(ctx, undefined);
  expect(ctx.bytes[0]).toBe(0);
  expect(ctx.i).toBe(1);
});

test("async.optional decode without value", async () => {
  expect(await typer.decode(ctx)).toBe(undefined);
  expect(ctx.i).toBe(1);
});
