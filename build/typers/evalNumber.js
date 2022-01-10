"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalFloat64 = exports.evalFloat32 = exports.evalBigInt64 = exports.evalBigUint64 = exports.evalInt32 = exports.evalInt16 = exports.evalInt8 = exports.evalUint32 = exports.evalUint16 = exports.evalUint8 = exports.evalNumber = void 0;
const evalNumber = (kind, size) => {
    const name = 
    /*@__PURE__*/ kind[0].toUpperCase() +
        /*@__PURE__*/ kind.slice(1) +
        size;
    const offset = size / 8;
    return /*@__PURE__*/ new Function(`return {encode(c,d){c.view.set${name}(c.i,d);c.i+=${offset}},decode(c){const d=c.view.get${name}(c.i);c.i+=${offset};return d}}`)();
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