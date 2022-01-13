/* istanbul ignore file */

import { AsyncSerDes, boolean, asyncDefine } from "../../src";

export const asyncBoolean: AsyncSerDes<boolean> = asyncDefine(
  async (ctx, data) => boolean.ser(ctx, data),
  async (ctx) => boolean.des(ctx)
);
