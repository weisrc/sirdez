import * as byts from "../../src";

const ctx = byts.createContext();

beforeEach(() => {
  ctx.i = 0;
});

for (const kind of ["Uint", "Int"]) {
  const signed = kind === "Int";
  for (const size of [8, 16, 32]) {
    const byteSize = size / 8;
    const method = (kind + size) as "Uint8";
    const name = method.toLowerCase() as "uint8";
    const typer = byts[name];
    const range = signed
      ? [-(2 ** (size - 1)), 2 ** (size - 1) - 1]
      : [0, 2 ** size - 1];
    for (const n of range) {
      test(name + " encode", () => {
        typer.encode(ctx, n);
        expect(ctx.i).toBe(byteSize);
        expect(ctx.view[`get${method}`](0)).toBe(n);
      });
      test(name + " decode", () => {
        expect(typer.decode(ctx)).toBe(n);
        expect(ctx.i).toBe(byteSize);
      });
    }
  }
  const method = `Big${kind}64` as "BigUint64";
  const name = `big${kind}64` as "bigUint64";
  const typer = byts[name];
  const range = signed
    ? [-9223372036854775808n, 9223372036854775807n]
    : [0n, 2n ** 64n - 1n];
  for (const n of range) {
    test(name + " encode", () => {
      typer.encode(ctx, n);
      expect(ctx.i).toBe(8);
      expect(ctx.view[`get${method}`](0)).toBe(n);
    });
    test(name + " decode", () => {
      expect(typer.decode(ctx)).toBe(n);
      expect(ctx.i).toBe(8);
    });
  }
}

const data = 2.7182817459106445;

test("float32 encode", () => {
  byts.float32.encode(ctx, data);
  expect(ctx.i).toBe(4);
  expect(ctx.view.getFloat32(0)).toBe(data);
});

test("float32 decode", () => {
  expect(byts.float32.decode(ctx)).toBe(data);
  expect(ctx.i).toBe(4);
});

test("float64 encode", () => {
  byts.float64.encode(ctx, data);
  expect(ctx.i).toBe(8);
  expect(ctx.view.getFloat64(0)).toBe(data);
});

test("float64 decode", () => {
  expect(byts.float64.decode(ctx)).toBe(data);
  expect(ctx.i).toBe(8);
});
