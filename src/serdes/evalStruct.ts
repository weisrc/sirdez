import { StructFactory, TupleFactory } from "..";
import { createStructSerDes } from "../utils";

export const evalStruct: StructFactory = (definition) =>
  createStructSerDes(definition, false);

export const evalTuple: TupleFactory = (...definition) =>
  evalStruct(definition);
