import { Type } from "avsc";
import * as sd from "../../src/node";
import { suite } from "../utils";

const sdMessages = sd.use(
  sd.array(
    sd.struct({
      msg: sd.string(sd.utf8, sd.uint16),
      at: sd.uint32
    }),
    sd.uint16
  )
);

const avMessages = Type.forSchema({
  type: "array",
  items: {
    name: "Message",
    type: "record",
    fields: [
      { name: "msg", type: "string" },
      { name: "at", type: "int" }
    ]
  }
});

const msg = `
The library you can rely on,
For binary serialization and deserialization,
In Node, Deno, and the Web environment,
Which is simple and yet performant.
`;

const data = new Array(512).fill({ msg, at: 0 });

let pacman = 0;

suite("main", "512 Messages", {
  "unsafe sirdez": () => {
    pacman +=
      sdMessages.fromBytes(sdMessages.toUnsafeBytes(data)).length -
      512;
  },
  sirdez: () => {
    pacman +=
      sdMessages.fromBytes(sdMessages.toBytes(data)).length - 512;
  },
  avsc: () => {
    pacman +=
      avMessages.fromBuffer(avMessages.toBuffer(data)).length - 512;
  },
  json: () => {
    pacman += JSON.parse(JSON.stringify(data)).length - 512;
  }
});

eval("" + pacman);
