import { use, msgpack, utf8 } from "../../src";

const json = use(msgpack(utf8));

test("unpack should throw when invalid", () => {
  expect(() => json.fromBytes(new Uint8Array([0xc1]))).toThrow();
});
