import { createStructTyper } from "../utils";
export const asyncEvalStruct = (definition) => createStructTyper(definition, true);
export const asyncEvalTuple = (...definition) => asyncEvalStruct(definition);
//# sourceMappingURL=asyncEvalStruct.js.map