import { StructFactory, TupleFactory } from "../index.ts";
import { createStructSerDes } from "../utils/index.ts";

export const evalStruct: StructFactory = (definition) =>
  createStructSerDes(definition, false);

export const evalTuple: TupleFactory = (...definition) =>
  evalStruct(definition);
