import { async, createContext, uint8 } from "../../../src";
import { asyncBoolean } from "./asyncBoolean";

const ctx = createContext();

const typer = async.array(asyncBoolean, uint8);

beforeEach(() => {
  ctx.i = 0;
});

test("async.array encode", async () => {
  await typer.encode(ctx, [true, false, true]);
  expect(ctx.bytes[0]).toBe(3);
  expect(ctx.i).toBe(4);
});

test("async.array decode", async () => {
  expect(await typer.decode(ctx)).toEqual([true, false, true]);
  expect(ctx.i).toBe(4);
});
