import { AsyncArrayMaker } from "../types/index.ts";

export const asyncArray: AsyncArrayMaker = (typer, header) => ({
  async encode(ctx, data) {
    const { length } = data;
    header.encode(ctx, length);
    for (let i = 0; i < length; i++) {
      await typer.encode(ctx, data[i]);
    }
  },
  async decode(ctx) {
    const length = header.decode(ctx);
    const data = [];
    for (let i = 0; i < length; i++) {
      data.push(await typer.decode(ctx));
    }
    return data;
  }
});
