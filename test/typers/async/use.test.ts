import {
  array,
  async,
  optional,
  string,
  TypeOf,
  uint16,
  uint32,
  uint8,
  utf8js
} from "../../../src";
import { text } from "../../fixtures/text";
import { asyncBoolean } from "./asyncBoolean";

const personTyper = async.struct({
  name: string(utf8js, uint8),
  age: uint8,
  address: optional(string(utf8js, uint8)),
  friends: array(string(utf8js, uint8), uint8),
  resume: string(utf8js, uint32),
  cool: asyncBoolean
});

const peopleTyper = async.array(personTyper, uint16);

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
  resume: text.slice(0, 500),
  cool: Boolean(Math.round(Math.random()))
});

const { encode, decode } = async.use(peopleTyper);

test("use will grow", async () => {
  const data = new Array(100).fill(0).map(randomPerson);
  expect(await decode(await encode(data))).toEqual(data);
});

test("use will throw other errors", () => {
  expect(
    async () =>
      await decode(
        await encode(["not a person" as unknown as Person])
      )
  ).rejects.toThrow(TypeError);
});
