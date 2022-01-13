import { createContext, growContext, contextFromBytes } from "../src";

test("create context", () => {
  const ctx = createContext(64);
  expect(ctx.i).toBe(0);
  expect(ctx.bytes.length).toBe(64);
  expect(ctx.view.byteLength).toBe(64);
});

test("grow context", () => {
  const ctx = createContext(64);
  growContext(ctx);
  expect(ctx.bytes.length).toBe(128);
  expect(ctx.view.byteLength).toBe(128);
});

test("context from bytes", () => {
  const ctx = contextFromBytes(new Uint8Array(128).subarray(64));
  expect(ctx.i).toBe(0);
  expect(ctx.bytes.length).toBe(64);
  expect(ctx.view.byteLength).toBe(64);
});
