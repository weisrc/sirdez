import {
  uint16,
  uint32,
  uint8,
  bigUint64,
  int8,
  int32,
  int16,
  bigInt64
} from "..";

import { Ser } from "../types";

export const packInt: Ser<number> = (ctx, data) => {
  if (data >= 0) {
    if (data < 128) {
      uint8.ser(ctx, data);
    } else if (data < 256) {
      uint8.ser(ctx, 0xcc);
      uint8.ser(ctx, data);
    } else if (data < 65536) {
      uint8.ser(ctx, 0xcd);
      uint16.ser(ctx, data);
    } else if (data < 4294967296) {
      uint8.ser(ctx, 0xce);
      uint32.ser(ctx, data);
    } else {
      uint8.ser(ctx, 0xcf);
      bigUint64.ser(ctx, BigInt(data));
    }
  } else {
    if (data >= -32) {
      int8.ser(ctx, data);
    } else if (data >= -128) {
      uint8.ser(ctx, 0xd0);
      int8.ser(ctx, data);
    } else if (data >= -32768) {
      uint8.ser(ctx, 0xd1);
      int16.ser(ctx, data);
    } else if (data >= -2147483648) {
      uint8.ser(ctx, 0xd2);
      int32.ser(ctx, data);
    } else {
      uint8.ser(ctx, 0xd3);
      bigInt64.ser(ctx, BigInt(data));
    }
  }
};
