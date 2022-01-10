"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalTuple = exports.evalStruct = void 0;
const utils_1 = require("../utils");
const evalStruct = (definition) => (0, utils_1.createStructTyper)(definition, false);
exports.evalStruct = evalStruct;
const evalTuple = (...definition) => (0, exports.evalStruct)(definition);
exports.evalTuple = evalTuple;
//# sourceMappingURL=evalStruct.js.map