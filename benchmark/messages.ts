import { Type } from "avsc";
import * as sd from "../src";
import { suite } from "./utils";

const sdMessages = sd.use(
  sd.array(sd.string(sd.nodeUtf8, sd.uint16), sd.uint16)
);

const avMessages = Type.forSchema({
  type: "array",
  items: { type: "string" }
});

let pacman = 0;

function test(id: string, data: string[]) {
  suite(id, {
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
}

test("512 Messages", new Array(512).fill("Hello world"));

const longMessage = `
The library you can rely on,
For binary serialization and deserialization,
In Node, Deno, and the Web environment,
Which is simple and yet performant.
`;

test("512 Texts", new Array(512).fill(longMessage));

eval("" + pacman);
