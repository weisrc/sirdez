import {
  array,
  optional,
  string,
  struct,
  GetType,
  uint16,
  uint32,
  uint8,
  utf8js
} from "../src";
import { use } from "../src/use";
import { text } from "./fixtures/text";

const personTyper = struct({
  name: string(utf8js, uint8),
  age: uint8,
  address: optional(string(utf8js, uint8)),
  friends: array(string(utf8js, uint8), uint8),
  resume: string(utf8js, uint32)
});

const peopleTyper = array(personTyper, uint16);

const names = [
  "alice",
  "bob",
  "carl",
  "daniel",
  "elliot",
  "federic",
  "george",
  "harry",
  "isabella"
];

const randomName = () =>
  names[Math.floor(Math.random() * names.length)];

type Person = GetType<typeof personTyper>;

const randomPerson = (): Person => ({
  name: randomName(),
  age: Math.floor(Math.random() * 100),
  address: Math.random() > 0.5 ? "some address here" : undefined,
  friends: new Array(100).fill(0).map(randomName),
  resume: text.slice(0, 200)
});

const { toBytes, toUnsafeBytes, fromBytes } = use(peopleTyper);

test("use will grow", () => {
  const data = new Array(100).fill(0).map(randomPerson);
  expect(fromBytes(toBytes(data))).toEqual(data);
});

test("use faster decode", () => {
  const data = new Array(1).fill(0).map(randomPerson);
  expect(fromBytes(toBytes(data))).toEqual(data);
});

test("use toUnsafeBytes", () => {
  const data = new Array(100).fill(0).map(randomPerson);
  expect(fromBytes(toUnsafeBytes(data))).toEqual(data);
});

test("use will throw other errors", () => {
  expect(() =>
    fromBytes(toBytes(["not a person" as unknown as Person]))
  ).toThrow(TypeError);
});

test("use fromBytes will throw RangeError if input too short", () => {
  expect(() => fromBytes(new Uint8Array([0]))).toThrow(RangeError);
});

test("use fromBytes will throw RangeError if input too long", () => {
  expect(() => fromBytes(new Uint8Array([0, 0, 0]))).toThrow(
    RangeError
  );
});
