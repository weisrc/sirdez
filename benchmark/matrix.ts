import { Type } from "avsc";
import * as sd from "../src";
import { suite } from "./utils";

const sdMatrix = sd.array(sd.array(sd.float64, sd.uint16), sd.uint16);

const avMatrix = Type.forSchema({
  type: "array",
  items: {
    type: "array",
    items: { type: "double" }
  }
});

const data = new Array(64).fill(new Array(64).fill(0));

let pacman = 0;

suite("64x64 Matrix", {
  "sirdez with temp": () => {
    pacman += sdMatrix.fromBytes(sdMatrix.toTempBytes(data))[0][0];
  },
  sirdez: () => {
    pacman += sdMatrix.fromBytes(sdMatrix.toBytes(data))[0][0];
  },
  avsc: () => {
    pacman += avMatrix.fromBuffer(avMatrix.toBuffer(data))[0][0];
  },
  json: () => {
    pacman += JSON.parse(JSON.stringify(data))[0][0];
  }
});

eval("" + pacman);
