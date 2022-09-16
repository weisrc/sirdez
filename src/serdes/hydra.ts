import { define } from "../define";
import { Serdes } from "../types";

export type HydraFactory = <T, C extends T>(
  sd: Serdes<T>,
  init: () => C
) => Serdes<C>;

export const hydra: HydraFactory = (sd, init) =>
  define(sd.ser, (ctx) => Object.assign(init(), sd.des(ctx)));
