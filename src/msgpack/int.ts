import { Ser } from "../types";

export const packInt: Ser<number> = (ctx, data) => {
  if (data >= 0) {
    if (data < 128) {
      ctx.view.setUint8(ctx.i++, data);
    } else if (data < 256) {
      ctx.view.setUint8(ctx.i++, 0xcc);
      ctx.view.setUint8(ctx.i++, data);
    } else if (data < 65536) {
      ctx.view.setUint8(ctx.i++, 0xcd);
      ctx.view.setUint16(ctx.i, data);
      ctx.i += 2;
    } else if (data < 4294967296) {
      ctx.view.setUint8(ctx.i++, 0xce);
      ctx.view.setUint32(ctx.i, data);
      ctx.i += 4;
    } else {
      ctx.view.setUint8(ctx.i++, 0xcf);
      ctx.view.setBigUint64(ctx.i, BigInt(data));
      ctx.i += 8;
    }
  } else {
    if (data >= -32) {
      ctx.view.setInt8(ctx.i++, data);
    } else if (data >= -128) {
      ctx.view.setUint8(ctx.i++, 0xd0);
      ctx.view.setInt8(ctx.i++, data);
    } else if (data >= -32768) {
      ctx.view.setUint8(ctx.i++, 0xd1);
      ctx.view.setInt16(ctx.i, data);
      ctx.i += 2;
    } else if (data >= -2147483648) {
      ctx.view.setUint8(ctx.i++, 0xd2);
      ctx.view.setInt32(ctx.i, data);
      ctx.i += 4;
    } else {
      ctx.view.setUint8(ctx.i++, 0xd3);
      ctx.view.setBigInt64(ctx.i, BigInt(data));
      ctx.i += 8;
    }
  }
};
