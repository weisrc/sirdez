import { decode, encode } from "@msgpack/msgpack";
import { msgpack, use, utf8 } from "../../src";

const tests: Record<string, unknown> = {
  "empty string": "",
  "string with helllo": "hello",
  "string with emoji": "👋",
  "string with emoji and chinese": "👋你好",
  "string with emoji and chinese and japanese": "👋你好こんにちは",
  "object with string": { hello: "world" },
  "object with string and number": { hello: "world", num: 123 },
  "object with string and number and boolean": {
    hello: "world",
    num: 123,
    bool: true
  },
  "object with string and number and boolean and null": {
    hello: "world",
    num: 123,
    bool: true,
    null: null
  },
  "array with string": ["hello"],
  "array with string and number": ["hello", 123],
  "array with string and number and boolean": ["hello", 123, true],
  "floating point number": 1.234,
  "negative floating point number": -1.234,
  "negative integer": -123,
  "positive integer": 123,
  zero: 0,
  "negative one": -1,
  "positive one": 1,
  "big number": 2 ** 31,
  "negative big number": -(2 ** 31),
  "big floating point number": 2 ** 31 + 0.5,
  "negative big floating point number": -(2 ** 31 + 0.5),
  "nested object": { hello: { world: "!" } },
  "nested array": ["hello", ["world", "!"]],
  "1k array": new Array(1e3).fill(0),
  "1k object": new Array(1e3).fill(0).reduce((acc, _, i) => {
    acc[i] = i;
    return acc;
  }, {} as Record<string, number>),
  "100k array": new Array(1e5).fill(0),
  "100k object": new Array(1e5).fill(0).reduce((acc, _, i) => {
    acc[i] = i;
    return acc;
  }, {} as Record<string, number>),
  "200 string": "a".repeat(200),
  "300 string": "a".repeat(300),
  "100k string": "a".repeat(1e5),
  "big int": 2 ** 32,
  false: false,
  true: true,
  null: null,
  "-10k number": -1e4,
  "-100k number": -1e5,
  "-big integer": -(2 ** 32)
};

const json = use(msgpack(utf8));

for (const [name, data] of Object.entries(tests)) {
  test("msgpack e2e: " + name, () => {
    const encoded = json.toBytes(data);
    const encoded2 = encode(data);
    expect(encoded).toEqual(encoded2);
    const decoded = json.fromBytes(encoded2);
    const decoded2 = decode(encoded);
    expect(decoded).toEqual(decoded2);
  });
}

const json32 = use(msgpack(utf8, true));

test("msgpack e2e: float32", () => {
  const encoded = json32.toBytes(1.234);
  const encoded2 = encode(1.234, { forceFloat32: true });
  expect(encoded).toEqual(encoded2);
  const decoded = json32.fromBytes(encoded2);
  const decoded2 = decode(encoded);
  expect(decoded).toEqual(decoded2);
});
