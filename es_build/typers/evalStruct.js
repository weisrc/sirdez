import { createStructTyper } from "../utils";
export const evalStruct = (definition) => createStructTyper(definition, false);
export const evalTuple = (...definition) => evalStruct(definition);
//# sourceMappingURL=evalStruct.js.map