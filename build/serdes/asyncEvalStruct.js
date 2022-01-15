"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncEvalTuple = exports.asyncEvalStruct = void 0;
const utils_1 = require("../utils");
const asyncEvalStruct = (definition) => (0, utils_1.createStructSerDes)(definition, true);
exports.asyncEvalStruct = asyncEvalStruct;
const asyncEvalTuple = (...definition) => (0, exports.asyncEvalStruct)(definition);
exports.asyncEvalTuple = asyncEvalTuple;
//# sourceMappingURL=asyncEvalStruct.js.map