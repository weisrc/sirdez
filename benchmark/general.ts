import { suite } from "./utils";
import { Type } from "avsc";
import * as sd from "../src";

const general = sd.evalStruct({
  ghost: sd.uint8,
  string: sd.string(sd.utf8js, sd.uint8),
  number: sd.float64,
  boolean: sd.boolean,
  arrayOfVector: sd.array(
    sd.evalStruct({
      x: sd.float64,
      y: sd.float64,
      z: sd.float64
    }),
    sd.uint16
  )
});

let pacman = 0;

const data: sd.GetType<typeof general> = {
  ghost: 0,
  string: "this is a short string",
  number: Math.PI,
  boolean: true,
  arrayOfVector: new Array(100).fill({ x: 1, y: 2, z: 3 })
};

const generalType = Type.forSchema({
  name: "general",
  type: "record",
  fields: [
    { name: "ghost", type: "int" },
    { name: "string", type: "string" },
    { name: "number", type: "double" },
    { name: "boolean", type: "boolean" },
    {
      name: "arrayOfVector",
      type: {
        type: "array",
        name: "array",
        items: {
          type: "record",
          name: "vector",
          fields: [
            { name: "x", type: "double" },
            { name: "y", type: "double" },
            { name: "z", type: "double" }
          ]
        }
      }
    }
  ]
});

suite("general", {
  sirdez: () => {
    pacman += general.fromBytes(general.toBytes(data)).ghost;
  },
  sirdez_temp: () => {
    pacman += general.fromBytes(general.toTempBytes(data)).ghost;
  },
  avsc: () => {
    pacman += generalType.fromBuffer(
      generalType.toBuffer(data)
    ).ghost;
  },
  json: () => {
    pacman += JSON.parse(JSON.stringify(data)).ghost;
  }
});

eval("" + pacman);
