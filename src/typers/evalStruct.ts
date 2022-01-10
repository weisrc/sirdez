import { StructMaker, TupleMaker } from "..";
import { createStructTyper } from "../utils";

export const evalStruct: StructMaker = (definition) =>
  createStructTyper(definition, false);

export const evalTuple: TupleMaker = (...definition) =>
  evalStruct(definition);
