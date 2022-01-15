import { AsyncStructFactory, AsyncTupleFactory } from "../types/index.ts";
import { createStructSerDes } from "../utils/index.ts";

export const asyncEvalStruct: AsyncStructFactory = (definition) =>
  createStructSerDes(definition, true);

export const asyncEvalTuple: AsyncTupleFactory = (...definition) =>
  asyncEvalStruct(definition);
