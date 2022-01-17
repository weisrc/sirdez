import { createContext, number, NumberFactory } from "../../src";
import { number as noevalNumber } from "../../src/noeval";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

function testNumber(number: NumberFactory, suffix = "") {
  for (const kind of ["Uint", "Int"]) {
    const signed = kind === "Int";
    for (const size of [8, 16, 32]) {
      const offset = size / 8;
      const method = (kind + size) as "Uint8";
      const name = kind.toLowerCase() as "uint";
      const typer = number(name, size as 8);
      const range = signed
        ? [-(2 ** (size - 1)), 2 ** (size - 1) - 1]
        : [0, 2 ** size - 1];
      for (const n of range) {
        test(name + suffix + size + " encode", () => {
          typer.ser(ctx, n);
          expect(ctx.i).toBe(offset);
          expect(ctx.view[`get${method}`](0)).toBe(n);
        });
        test(name + suffix + size + " decode", () => {
          expect(typer.des(ctx)).toBe(n);
          expect(ctx.i).toBe(offset);
        });
      }
    }
    const method = `Big${kind}64` as "BigUint64";
    const name = `big${kind}` as "bigUint";
    const typer = number(name, 64);
    const range = signed
      ? [-9223372036854775808n, 9223372036854775807n]
      : [0n, 2n ** 64n - 1n];
    for (const n of range) {
      test(name + suffix + "64 encode", () => {
        typer.ser(ctx, n);
        expect(ctx.i).toBe(8);
        expect(ctx.view[`get${method}`](0)).toBe(n);
      });
      test(name + suffix + "64 decode", () => {
        expect(typer.des(ctx)).toBe(n);
        expect(ctx.i).toBe(8);
      });
    }
  }

  const data = 2.7182817459106445;

  test("float32" + suffix + " encode", () => {
    number("float", 32).ser(ctx, data);
    expect(ctx.i).toBe(4);
    expect(ctx.view.getFloat32(0)).toBe(data);
  });

  test("float32" + suffix + " decode", () => {
    expect(number("float", 32).des(ctx)).toBe(data);
    expect(ctx.i).toBe(4);
  });

  test("float64" + suffix + " encode", () => {
    number("float", 64).ser(ctx, data);
    expect(ctx.i).toBe(8);
    expect(ctx.view.getFloat64(0)).toBe(data);
  });

  test("float64" + suffix + " decode", () => {
    expect(number("float", 64).des(ctx)).toBe(data);
    expect(ctx.i).toBe(8);
  });
}

testNumber(number);
testNumber(noevalNumber, "@noeval");
