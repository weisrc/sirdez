"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.float64 = exports.float32 = exports.bigInt64 = exports.bigUint64 = exports.int32 = exports.int16 = exports.int8 = exports.uint32 = exports.uint16 = exports.uint8 = exports.number = void 0;
const define_1 = require("../define");
const number = (kind, bitSize) => {
    const name = 
    /*@__PURE__*/ kind[0].toUpperCase() +
        /*@__PURE__*/ kind.slice(1) +
        bitSize;
    const size = bitSize / 8;
    return /*@__PURE__*/ new Function("d", `return d((c,d)=>{c.view.set${name}(c.i,d);c.i+=${size}},(c)=>{const d=c.view.get${name}(c.i);c.i+=${size};return d})`)(define_1.define);
};
exports.number = number;
exports.uint8 = (0, exports.number)("uint", 8);
exports.uint16 = (0, exports.number)("uint", 16);
exports.uint32 = (0, exports.number)("uint", 32);
exports.int8 = (0, exports.number)("int", 8);
exports.int16 = (0, exports.number)("int", 16);
exports.int32 = (0, exports.number)("int", 32);
exports.bigUint64 = (0, exports.number)("bigUint", 64);
exports.bigInt64 = (0, exports.number)("bigInt", 64);
exports.float32 = (0, exports.number)("float", 32);
exports.float64 = (0, exports.number)("float", 64);
//# sourceMappingURL=number.js.map