import {
  array,
  asyncStruct,
  asyncArray,
  optional,
  string,
  GetType,
  uint16,
  uint32,
  uint8,
  utf8js
} from "../src";
import { text } from "./fixtures/text";
import { asyncBoolean } from "./serdes/asyncBoolean";

const personTyper = asyncStruct({
  name: string(utf8js, uint8),
  age: uint8,
  address: optional(string(utf8js, uint8)),
  friends: array(string(utf8js, uint8), uint8),
  resume: string(utf8js, uint32),
  cool: asyncBoolean
});

const peopleTyper = asyncArray(personTyper, uint16);

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
  resume: text.slice(0, 500),
  cool: Boolean(Math.round(Math.random()))
});

const { toBytes, toTempBytes, fromBytes } = peopleTyper;

test("async.use will grow", async () => {
  const data = new Array(100).fill(0).map(randomPerson);
  expect(await fromBytes(await toBytes(data))).toEqual(data);
});

test("async.use instant", async () => {
  const data = new Array(100).fill(0).map(randomPerson);
  expect(await fromBytes(await toTempBytes(data))).toEqual(data);
});

test("use will throw other errors", () => {
  expect(
    async () =>
      await fromBytes(
        await toBytes(["not a person" as unknown as Person])
      )
  ).rejects.toThrow(TypeError);
});