/* istanbul ignore file */

import { AsyncTyper, boolean } from "../../../src";

export const asyncBoolean: AsyncTyper<boolean> = {
  async encode(ctx, data) {
    boolean.encode(ctx, data);
  },
  async decode(ctx) {
    return boolean.decode(ctx);
  }
};
