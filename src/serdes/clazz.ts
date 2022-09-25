import { Serdes } from "../types";

export interface ClazzSerdes<T> extends Serdes<T> {
  readonly clazz: { new (): T };
}

export type ClazzFactory = <T, C extends T>(
  clazz: { new (): C },
  sd: Serdes<T>
) => ClazzSerdes<C>;

export const clazz: ClazzFactory = (clazz, sd) => ({
  clazz,
  ser: sd.ser,
  des: (ctx) => Object.assign(new clazz(), sd.des(ctx))
});
