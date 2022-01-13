import {
  asyncRecord,
  createContext,
  string,
  uint8,
  utf8
} from "../../src";
import { asyncBoolean } from "./asyncBoolean";

const ctx = createContext();

const serdes = asyncRecord(asyncBoolean, uint8, string(utf8, uint8));

beforeEach(() => {
  ctx.i = 0;
});

const data = { hello: true, test: false };

test("async.record encode", async () => {
  await serdes.ser(ctx, data);
  expect(ctx.bytes[0]).toBe(2);
  expect(ctx.i).toBe(14);
});

test("async.record decode", async () => {
  expect(await serdes.des(ctx)).toEqual(data);
  expect(ctx.i).toBe(14);
});
