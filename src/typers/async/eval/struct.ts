import { AsyncStructMaker, AsyncTupleMaker } from "../../../types";
import { createStructTyper } from "../../../utils";

export const struct: AsyncStructMaker = (definition) =>
  createStructTyper(definition, true);

export const tuple: AsyncTupleMaker = (...definition) =>
  struct(definition);
