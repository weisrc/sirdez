import { AsyncRecordMaker, TypeOf } from "../../types";

export const record: AsyncRecordMaker = (typer, header, keyer) => ({
  async encode(ctx, data) {
    const { length } = Object.keys(data);
    header.encode(ctx, length);
    for (const key in data) {
      keyer.encode(ctx, key);
      await typer.encode(ctx, data[key]);
    }
  },
  async decode(ctx) {
    const length = header.decode(ctx);
    const data: TypeOf<typeof this> = {};
    for (let i = 0; i < length; i++) {
      data[keyer.decode(ctx)] = await typer.decode(ctx);
    }
    return data;
  }
});
