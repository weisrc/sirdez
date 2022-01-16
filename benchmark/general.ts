import { suite } from "./utils";
import { Type } from "avsc";
import * as sd from "../src";

const sdGeneral = sd.use(
  sd.struct({
    ghost: sd.uint8,
    string: sd.string(sd.utf8js, sd.uint16),
    number: sd.float64,
    boolean: sd.boolean,
    array: sd.array(
      sd.struct({
        string: sd.string(sd.utf8js, sd.uint16),
        x: sd.float64,
        y: sd.float64,
        z: sd.float64
      }),
      sd.uint16
    )
  })
);

let pacman = 0;

const data: sd.GetType<typeof sdGeneral> = {
  ghost: 0,
  string: "This is a string with characters.",
  number: Math.PI,
  boolean: true,
  array: new Array(512).fill({
    string: "I am a 3D vector",
    x: 1,
    y: 2,
    z: 3
  })
};

const avGeneral = Type.forSchema({
  name: "General",
  type: "record",
  fields: [
    { name: "ghost", type: "int" },
    { name: "string", type: "string" },
    { name: "number", type: "double" },
    { name: "boolean", type: "boolean" },
    {
      name: "array",
      type: {
        type: "array",
        name: "array",
        items: {
          type: "record",
          name: "vector",
          fields: [
            { name: "string", type: "string" },
            { name: "x", type: "double" },
            { name: "y", type: "double" },
            { name: "z", type: "double" }
          ]
        }
      }
    }
  ]
});

suite("General", {
  "unsafe sirdez": () => {
    pacman += sdGeneral.fromBytes(
      sdGeneral.toUnsafeBytes(data)
    ).ghost;
  },
  sirdez: () => {
    pacman += sdGeneral.fromBytes(sdGeneral.toBytes(data)).ghost;
  },
  avsc: () => {
    pacman += avGeneral.fromBuffer(avGeneral.toBuffer(data)).ghost;
  },
  json: () => {
    pacman += JSON.parse(JSON.stringify(data)).ghost;
  }
});

eval("" + pacman);
