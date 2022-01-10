import { StructMaker, TupleMaker } from "../index.ts";
import { createStructTyper } from "../utils/index.ts";

export const evalStruct: StructMaker = (definition) =>
  createStructTyper(definition, false);

export const evalTuple: TupleMaker = (...definition) =>
  evalStruct(definition);
