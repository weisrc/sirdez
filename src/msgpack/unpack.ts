import {
  bigInt64,
  bigUint64,
  float32,
  float64,
  int16,
  int32,
  int8,
  uint16,
  uint32,
  uint8
} from "../noeval";
import { Context, Encoding } from "../types";
import { unpackArrayBody } from "./array";
import { unpackMapBody } from "./map";

export function unpack(
  ctx: Context,
  encoding: Encoding<string>
): unknown {
  const byte = ctx.view.getUint8(ctx.i++);

  switch (byte) {
    case 0xc0:
      return null;
    case 0xc2:
      return false;
    case 0xc3:
      return true;
    case 0xca:
      return float32.des(ctx);
    case 0xcb:
      return float64.des(ctx);
    case 0xcc:
      return uint8.des(ctx);
    case 0xcd:
      return uint16.des(ctx);
    case 0xce:
      return uint32.des(ctx);
    case 0xcf:
      return Number(bigUint64.des(ctx));
    case 0xd0:
      return int8.des(ctx);
    case 0xd1:
      return int16.des(ctx);
    case 0xd2:
      return int32.des(ctx);
    case 0xd3:
      return Number(bigInt64.des(ctx));
    case 0xd9:
      return encoding.decode(ctx, uint8.des(ctx));
    case 0xda:
      return encoding.decode(ctx, uint16.des(ctx));
    case 0xdb:
      return encoding.decode(ctx, uint32.des(ctx));
    case 0xdc:
      return unpackArrayBody(ctx, uint16.des(ctx), encoding);
    case 0xdd:
      return unpackArrayBody(ctx, uint32.des(ctx), encoding);
    case 0xde:
      return unpackMapBody(ctx, uint16.des(ctx), encoding);
    case 0xdf:
      return unpackMapBody(ctx, uint32.des(ctx), encoding);
  }

  if (byte < 0x80) return byte;
  if (byte < 0x90) return unpackMapBody(ctx, byte - 0x80, encoding);
  if (byte < 0xa0) return unpackArrayBody(ctx, byte - 0x90, encoding);
  if (byte < 0xc0) return encoding.decode(ctx, byte - 0xa0);
  if (byte >= 0xe0) return byte - 0x100;

  throw new Error("Unsupported type");
}
