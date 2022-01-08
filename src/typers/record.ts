import { RecordMaker, TypeOf } from "../types";

export const record: RecordMaker = (typer, header, keyer) => ({
  encode(ctx, data) {
    const { length } = Object.keys(data);
    header.encode(ctx, length);
    for (const key in data) {
      keyer.encode(ctx, key);
      typer.encode(ctx, data[key]);
    }
  },
  decode(ctx) {
    const length = header.decode(ctx);
    const data: Record<string, TypeOf<typeof typer>> = {};
    for (let i = 0; i < length; i++) {
      data[keyer.decode(ctx)] = typer.decode(ctx);
    }
    return data;
  }
});
