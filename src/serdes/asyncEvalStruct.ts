import { AsyncStructFactory, AsyncTupleFactory } from "../types";
import { createStructSerDes } from "../utils";

export const asyncEvalStruct: AsyncStructFactory = (definition) =>
  createStructSerDes(definition, true);

export const asyncEvalTuple: AsyncTupleFactory = (...definition) =>
  asyncEvalStruct(definition);
