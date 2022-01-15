"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalFloat64 = exports.evalFloat32 = exports.evalBigInt64 = exports.evalBigUint64 = exports.evalInt32 = exports.evalInt16 = exports.evalInt8 = exports.evalUint32 = exports.evalUint16 = exports.evalUint8 = exports.evalNumber = void 0;
const define_1 = require("../define");
const evalNumber = (kind, bitSize) => {
    const name = 
    /*@__PURE__*/ kind[0].toUpperCase() +
        /*@__PURE__*/ kind.slice(1) +
        bitSize;
    const size = bitSize / 8;
    return /*@__PURE__*/ new Function("d", `return d((c,d)=>{c.view.set${name}(c.i,d);c.i+=${size}},(c)=>{const d=c.view.get${name}(c.i);c.i+=${size};return d})`)(define_1.define);
};
exports.evalNumber = evalNumber;
exports.evalUint8 = (0, exports.evalNumber)("uint", 8);
exports.evalUint16 = (0, exports.evalNumber)("uint", 16);
exports.evalUint32 = (0, exports.evalNumber)("uint", 32);
exports.evalInt8 = (0, exports.evalNumber)("int", 8);
exports.evalInt16 = (0, exports.evalNumber)("int", 16);
exports.evalInt32 = (0, exports.evalNumber)("int", 32);
exports.evalBigUint64 = (0, exports.evalNumber)("bigUint", 64);
exports.evalBigInt64 = (0, exports.evalNumber)("bigInt", 64);
exports.evalFloat32 = (0, exports.evalNumber)("float", 32);
exports.evalFloat64 = (0, exports.evalNumber)("float", 64);
//# sourceMappingURL=evalNumber.js.map