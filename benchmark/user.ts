import { Type } from "avsc";
import {
  array,
  evalStruct,
  GetType,
  string,
  uint16,
  uint32,
  uint8,
  utf16
} from "../src";
import { suite } from "./utils";

let pacman = 0;

const sirdez = evalStruct({
  ghost: uint8,
  name: string(utf16, uint8),
  joinedAt: uint32,
  repositories: array(string(utf16, uint8), uint16)
});

const data: GetType<typeof sirdez> = {
  ghost: 0,
  name: "weisrc",
  joinedAt: 12331233,
  repositories: ["sirdez", "and", "the", "green", "knight"]
};

const avsc = Type.forValue(data);

suite("user_encode", {
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
    // @ts-expect-error will work
    pacman += !JSON.stringify(data);
  }
});

const sirdezEncoded = sirdez.toBytes(data);
const avscEncoded = avsc.toBuffer(data);
const jsonEncoded = JSON.stringify(data);

suite("user_decode", {
  sirdez: () => {
    pacman += sirdez.fromBytes(sirdezEncoded).ghost;
  },
  avsc: () => {
    pacman += avsc.fromBuffer(avscEncoded).ghost;
  },
  json: () => {
    pacman += JSON.parse(jsonEncoded).ghost;
  }
});

eval("" + pacman);
