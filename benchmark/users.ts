import { Type } from "avsc";
import * as sd from "../src";
import { suite } from "./utils";

const sdUsers = sd.array(
  sd.evalStruct({
    ghost: sd.uint8,
    name: sd.string(sd.utf16, sd.uint8),
    joinedAt: sd.uint32,
    repositories: sd.array(sd.string(sd.utf16, sd.uint8), sd.uint16)
  }),
  sd.uint16
);

const avUser = Type.forSchema({
  type: "array",
  items: {
    type: "record",
    name: "user",
    fields: [
      { name: "ghost", type: "int" },
      { name: "name", type: "string" },
      { name: "joinedAt", type: { type: "int" } },
      {
        name: "repositories",
        type: { type: "array", items: { type: "string" } }
      }
    ]
  }
});

const data: sd.GetType<typeof sdUsers> = new Array(256).fill({
  ghost: 0,
  name: "weisrc",
  joinedAt: 0,
  repositories: ["sirdez", "and", "the", "green", "knight"]
});

let pacman = 0;

suite("256 Users", {
  "sirdez with temp": () => {
    pacman += sdUsers.fromBytes(sdUsers.toTempBytes(data))[0].ghost;
  },
  sirdez: () => {
    pacman += sdUsers.fromBytes(sdUsers.toBytes(data))[0].ghost;
  },
  avsc: () => {
    pacman += avUser.fromBuffer(avUser.toBuffer(data))[0].ghost;
  },
  json: () => {
    pacman += JSON.parse(JSON.stringify(data))[0].ghost;
  }
});

eval("" + pacman);
