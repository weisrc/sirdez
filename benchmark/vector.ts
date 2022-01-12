import { Suite } from "benchmark";
import { evalStruct, float64, GetType, uint8, use } from "../src";
import { Type } from "avsc";

let pacman = 0;

const sirdez = use(
  evalStruct({
    ghost: uint8,
    x: float64,
    y: float64,
    z: float64
  })
);

const avsc = Type.forSchema({
  type: "record",
  name: "Vector",
  fields: [
    { name: "ghost", type: { type: "int" } },
    { name: "x", type: { type: "double" } },
    { name: "y", type: { type: "double" } },
    { name: "z", type: { type: "double" } }
  ]
});

const data: GetType<typeof sirdez> = {
  ghost: 0,
  x: Math.E,
  y: Math.PI,
  z: Math.SQRT2
};

console.log("vector#encode:");

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
  .add("json", () => {
    JSON.stringify(data);
  })
  .on("cycle", ({ target: { name, hz } }) => {
    console.log(`${Math.round(hz)} ${name}`);
  })
  .run();

console.log("vector#decode:");

const array = sirdez.encode(data);
const buffer = avsc.toBuffer(data);
const json = JSON.stringify(data);

new Suite()
  .add("sirdez", () => {
    pacman += sirdez.decode(array).x;
  })
  .add("avsc", () => {
    pacman += avsc.fromBuffer(buffer).x;
  })
  .add("json", () => {
    pacman += JSON.parse(json).x;
  })
  .on("cycle", ({ target: { name, hz } }) => {
    console.log(`${Math.round(hz)} ${name}`);
  })
  .run();

eval("" + pacman);
