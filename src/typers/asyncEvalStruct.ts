import { AsyncStructMaker, AsyncTupleMaker } from "../types";
import { createStructTyper } from "../utils";

export const asyncEvalStruct: AsyncStructMaker = (definition) =>
  createStructTyper(definition, true);

export const asyncEvalTuple: AsyncTupleMaker = (...definition) =>
  asyncEvalStruct(definition);
