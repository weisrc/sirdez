import {
  array,
  optional,
  string,
  struct,
  TypeOf,
  uint16,
  uint32,
  uint8,
  use,
  utf8js
} from "../../src";
import { text } from "../fixtures/text";

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

type Person = TypeOf<typeof personTyper>;

const randomPerson = (): Person => ({
  name: randomName(),
  age: Math.floor(Math.random() * 100),
  address: Math.random() > 0.5 ? "some address here" : undefined,
  friends: new Array(100).fill(0).map(randomName),
  resume: text.slice(0, 500)
});

const { encode, decode } = use(peopleTyper);

test("use will grow", () => {
  const data = new Array(100).fill(0).map(randomPerson);
  expect(decode(encode(data))).toEqual(data);
});

test("use will throw other errors", () => {
  expect(() =>
    decode(encode(["not a person" as unknown as Person]))
  ).toThrow(TypeError);
});
