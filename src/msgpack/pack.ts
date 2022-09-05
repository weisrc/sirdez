import { Context, Ser } from "../types";
import { packArray } from "./array";
import { packInt } from "./int";
import { packMap } from "./map";

export function pack(
  ctx: Context,
  data: unknown,
  floatHead: number,
  float: Ser<number>,
  str: Ser<string>
) {
  if (data === null) ctx.view.setUint8(ctx.i++, 0xc0);
  else if (data === false) ctx.view.setUint8(ctx.i++, 0xc2);
  else if (data === true) ctx.view.setUint8(ctx.i++, 0xc3);
  else if (typeof data === "number") {
    if (Number.isInteger(data)) packInt(ctx, data);
    else {
      ctx.view.setUint8(ctx.i++, floatHead);
      float(ctx, data);
    }
  } else if (typeof data === "string") str(ctx, data);
  else if (Array.isArray(data))
    packArray(ctx, data, floatHead, float, str);
  else if (typeof data === "object")
    packMap(
      ctx,
      data as Record<string | number, unknown>,
      floatHead,
      float,
      str
    );
  else throw new Error("Unsupported type");
}
