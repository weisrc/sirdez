import { define } from "../define";
import { NumberFactory, SerDes } from "../types";

export const uint8: SerDes<number> = define(
  (ctx, data) => ctx.view.setUint8(ctx.i++, data),
  (ctx) => ctx.view.getUint8(ctx.i++)
);

export const uint16: SerDes<number> = define(
  (ctx, data) => {
    ctx.view.setUint16(ctx.i, data);
    ctx.i += 2;
  },
  (ctx) => {
    const data = ctx.view.getUint16(ctx.i);
    ctx.i += 2;
    return data;
  }
);

export const uint32: SerDes<number> = define(
  (ctx, data) => {
    ctx.view.setUint32(ctx.i, data);
    ctx.i += 4;
  },
  (ctx) => {
    const data = ctx.view.getUint32(ctx.i);
    ctx.i += 4;
    return data;
  }
);

export const bigUint64: SerDes<bigint> = define(
  (ctx, data) => {
    ctx.view.setBigUint64(ctx.i, data);
    ctx.i += 8;
  },
  (ctx) => {
    const data = ctx.view.getBigUint64(ctx.i);
    ctx.i += 8;
    return data;
  }
);

export const int8: SerDes<number> = define(
  (ctx, data) => ctx.view.setInt8(ctx.i++, data),
  (ctx) => ctx.view.getInt8(ctx.i++)
);

export const int16: SerDes<number> = define(
  (ctx, data) => {
    ctx.view.setInt16(ctx.i, data);
    ctx.i += 2;
  },
  (ctx) => {
    const data = ctx.view.getInt16(ctx.i);
    ctx.i += 2;
    return data;
  }
);

export const int32: SerDes<number> = define(
  (ctx, data) => {
    ctx.view.setInt32(ctx.i, data);
    ctx.i += 4;
  },
  (ctx) => {
    const data = ctx.view.getInt32(ctx.i);
    ctx.i += 4;
    return data;
  }
);

export const bigInt64: SerDes<bigint> = define(
  (ctx, data) => {
    ctx.view.setBigInt64(ctx.i, data);
    ctx.i += 8;
  },
  (ctx) => {
    const data = ctx.view.getBigInt64(ctx.i);
    ctx.i += 8;
    return data;
  }
);

export const float32: SerDes<number> = define(
  (ctx, data) => {
    ctx.view.setFloat32(ctx.i, data);
    ctx.i += 4;
  },
  (ctx) => {
    const data = ctx.view.getFloat32(ctx.i);
    ctx.i += 4;
    return data;
  }
);

export const float64: SerDes<number> = define(
  (ctx, data) => {
    ctx.view.setFloat64(ctx.i, data);
    ctx.i += 8;
  },
  (ctx) => {
    const data = ctx.view.getFloat64(ctx.i);
    ctx.i += 8;
    return data;
  }
);

const mappings = {
  uint8,
  uint16,
  uint32,
  int8,
  int16,
  int32,
  float32,
  float64,
  bigUint64,
  bigInt64
} as const;

export const number: NumberFactory = (kind, bitSize) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mappings[`${kind}${bitSize}` as keyof typeof mappings] as any;
