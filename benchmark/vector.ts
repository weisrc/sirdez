import { Type } from "avsc";
import { evalStruct, float64, GetType, uint8 } from "../src";
import { suite } from "./utils";

let pacman = 0;

const sirdez = evalStruct({
  ghost: uint8,
  x: float64,
  y: float64,
  z: float64
});

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

suite("vector_encode", {
  sirdez_temp: () => {
    pacman += sirdez.toTempBytes(data)[0];
  },
  sirdez: () => {
    pacman += sirdez.toBytes(data)[0];
  },
  avsc: () => {
    pacman += avsc.toBuffer(data)[0];
  },
  json: () => {
    JSON.stringify(data);
  }
});

const array = sirdez.toBytes(data);
const buffer = avsc.toBuffer(data);
const json = JSON.stringify(data);

suite("vector_decode", {
  sirdez: () => {
    pacman += sirdez.fromBytes(array).x;
  },
  avsc: () => {
    pacman += avsc.fromBuffer(buffer).x;
  },
  json: () => {
    pacman += JSON.parse(json).x;
  }
});

eval("" + pacman);
