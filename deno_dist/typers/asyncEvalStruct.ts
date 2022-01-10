import { AsyncStructMaker, AsyncTupleMaker } from "../types/index.ts";
import { createStructTyper } from "../utils/index.ts";

export const asyncEvalStruct: AsyncStructMaker = (definition) =>
  createStructTyper(definition, true);

export const asyncEvalTuple: AsyncTupleMaker = (...definition) =>
  asyncEvalStruct(definition);
