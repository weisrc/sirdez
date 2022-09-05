import { encode } from "@msgpack/msgpack";
import { use, utf8js } from "../../src";
import { msgpack } from "../../src/msgpack";
import { suite } from "../utils";

let pacman = 0;

// const data = {
//   ghost: 0,
//   string: "This is a string with characters.".repeat(10000),
//   number: Math.PI,
//   boolean: true,
//   array: new Array(512).fill({
//     string: "I am a 3D vector",
//     x: 1,
//     y: 2,
//     z: 3
//   })
// };

const data = { name: "hello world", test: { another: "world" } };

const json = use(msgpack(utf8js));

suite("msgpack", "Encode", {
  "unsafe sirdez": () => {
    pacman += json.toUnsafeBytes(data)[0];
  },
  sirdez: () => {
    pacman += json.toBytes(data)[0];
  },
  msgpack: () => {
    pacman += encode(data)[0];
  }
});

eval("" + pacman);
