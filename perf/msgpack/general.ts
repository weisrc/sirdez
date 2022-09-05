import { decode, encode } from "@msgpack/msgpack";
import { use, utf8js } from "../../src";
import { msgpack } from "../../src/msgpack";
import { suite } from "../utils";

let pacman = 0;

const data = {
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

const json = use(msgpack(utf8js));

suite("msgpack", "General", {
  "unsafe sirdez": () => {
    // @ts-expect-error ghost exists
    pacman += json.fromBytes(json.toUnsafeBytes(data)).ghost;
  },
  sirdez: () => {
    // @ts-expect-error ghost exists
    pacman += json.fromBytes(json.toBytes(data)).ghost;
  },
  msgpack: () => {
    // @ts-expect-error ghost exists
    pacman += decode(encode(data)).ghost;
  },
  json: () => {
    pacman += JSON.parse(JSON.stringify(data)).ghost;
  }
});

eval("" + pacman);
