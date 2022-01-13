import { createContext, asyncOptional } from "../../src";
import { asyncBoolean } from "./asyncBoolean";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

const serdes = asyncOptional(asyncBoolean);

test("async.optional encode with value", async () => {
  await serdes.ser(ctx, true);
  expect(ctx.bytes[0]).toBe(1);
  expect(ctx.i).toBe(2);
});

test("async.optional decode with value", async () => {
  expect(await serdes.des(ctx)).toBe(true);
  expect(ctx.i).toBe(2);
});

test("async.optional encode without value", async () => {
  await serdes.ser(ctx, undefined);
  expect(ctx.bytes[0]).toBe(0);
  expect(ctx.i).toBe(1);
});

test("async.optional decode without value", async () => {
  expect(await serdes.des(ctx)).toBe(undefined);
  expect(ctx.i).toBe(1);
});
