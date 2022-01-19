import { size, createContext } from "../../src";

const ctx = createContext();

beforeEach(() => {
  ctx.i = 0;
});

const tests: [n: number, ...data: number[]][] = [
  [0, 0],
  [-1, 1],
  [2, 4],
  [-2, 3],
  [-64, 0x7f],
  [64, 0x80, 1],
  [1e3, 0xd0, 0x0f],
  [-1e3, 0xcf, 0x0f],
  [1e6, 0x80, 0x89, 0x7a],
  [-1e6, 0xff, 0x88, 0x7a],
  [1e9, 0x80, 0xa8, 0xd6, 0xb9, 0x07],
  [-1e9, 0xff, 0xa7, 0xd6, 0xb9, 0x07]
];

for (const [n, ...data] of tests) {
  test("size encode " + n, () => {
    size.ser(ctx, n);
    expect(ctx.bytes.slice(0, data.length)).toEqual(
      new Uint8Array(data)
    );
    expect(ctx.i).toBe(data.length);
  });
  test("size decode " + n, () => {
    expect(size.des(ctx)).toBe(n);
    expect(ctx.i).toBe(data.length);
  });
}
