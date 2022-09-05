import { use, utf8 } from "../../src";
import { msgpack } from "../../src/msgpack";

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
  "nested array": ["hello", ["world", "!"]]
};

for (const [name, data] of Object.entries(tests)) {
  test("msgpack e2e: " + name, () => {
    const json = use(msgpack(utf8));
    const encoded = json.toBytes(data);
    const decoded = json.fromBytes(encoded);
    expect(decoded).toEqual(data);
  });
}
