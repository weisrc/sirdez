import { StructMaker, TupleMaker } from "../..";
import { createStructTyper } from "../../utils";

export const struct: StructMaker = (definition) =>
  createStructTyper(definition, false);

export const tuple: TupleMaker = (...definition) =>
  struct(definition);
