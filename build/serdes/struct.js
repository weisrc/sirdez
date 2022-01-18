"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuple = exports.struct = void 0;
const __1 = require("..");
const nameOf = (key) => 
/*@__PURE__*/ isNaN(+key) ? /*@__PURE__*/ JSON.stringify(key) : key;
const struct = (definition) => {
    const keys = /*@__PURE__*/ Object.keys(definition);
    const indexes = /*@__PURE__*/ Object.keys(keys).map((i) => +i);
    const values = /*@__PURE__*/ Object.values(definition);
    return /*@__PURE__*/ new Function("d", `[${indexes.map((i) => "k" + i).join()}]`, `[${indexes.map((i) => "s" + i).join()}]`, `[${indexes.map((i) => "d" + i).join()}]`, `return d((c,d)=>{${indexes
        .map((i) => `s${i}(c,d[${nameOf(keys[i])}])`)
        .join(";")}},(c)=>{const d=${definition instanceof Array ? "[]" : "{}"};${indexes
        .map((i) => `d[${nameOf(keys[i])}]=d${i}(c)`)
        .join(";")};return d})`)(__1.define, keys, 
    /*@__PURE__*/ values.map(({ ser }) => ser), 
    /*@__PURE__*/ values.map(({ des }) => des));
};
exports.struct = struct;
const tuple = (...definition) => (0, exports.struct)(definition);
exports.tuple = tuple;
//# sourceMappingURL=struct.js.map