import { Type } from "avsc";
import { Suite } from "benchmark";
import {
  array,
  evalStruct,
  GetType,
  string,
  uint16,
  uint32,
  uint8,
  use,
  utf16
} from "../src";

let pacman = 0;

const sirdez = use(
  evalStruct({
    ghost: uint8,
    name: string(utf16, uint8),
    joinedAt: uint32,
    repositories: array(string(utf16, uint8), uint16)
  })
);

const data: GetType<typeof sirdez> = {
  ghost: 0,
  name: "weisrc",
  joinedAt: 12331233,
  repositories: ["sirdez", "and", "the", "green", "knight"]
};

const avsc = Type.forValue(data);

console.log("user#encode:");

new Suite()
  .add("sirdez", () => {
    pacman += sirdez.encode(data)[0];
  })
  .add("sirdez#instant", () => {
    pacman += sirdez.instantEncode(data)[0];
  })
  .add("avsc", () => {
    pacman += avsc.toBuffer(data)[0];
  })
  .add("JSON", () => {
    // @ts-expect-error will work
    pacman += !JSON.stringify(data);
  })
  .on("cycle", ({ target: { name, hz } }) => {
    console.log(`${Math.round(hz)} ${name}`);
  })
  .run();

const sirdezEncoded = sirdez.encode(data);
const avscEncoded = avsc.toBuffer(data);
const jsonEncoded = JSON.stringify(data);

console.log("user#decode:");

new Suite()
  .add("sirdez", () => {
    pacman += sirdez.decode(sirdezEncoded).ghost;
  })
  .add("avsc", () => {
    pacman += avsc.fromBuffer(avscEncoded).ghost;
  })
  .add("JSON", () => {
    pacman += JSON.parse(jsonEncoded).ghost;
  })
  .on("cycle", ({ target: { name, hz } }) => {
    console.log(`${Math.round(hz)} ${name}`);
  })
  .run();

eval("" + pacman);
