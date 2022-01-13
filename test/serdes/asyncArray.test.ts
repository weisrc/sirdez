import { createContext, uint8, asyncArray } from "../../src";
import { asyncBoolean } from "./asyncBoolean";

const ctx = createContext();

const typer = asyncArray(asyncBoolean, uint8);

beforeEach(() => {
  ctx.i = 0;
});

test("async.array encode", async () => {
  await typer.ser(ctx, [true, false, true]);
  expect(ctx.bytes[0]).toBe(3);
  expect(ctx.i).toBe(4);
});

test("async.array decode", async () => {
  expect(await typer.des(ctx)).toEqual([true, false, true]);
  expect(ctx.i).toBe(4);
});
