"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructSerDes = void 0;
const define_1 = require("../define");
const nameOf = (key) => 
/*@__PURE__*/ isNaN(+key) ? /*@__PURE__*/ JSON.stringify(key) : key;
function createStructSerDes(definition, async) {
    const as = async ? "async " : "";
    const aw = async ? "await " : "";
    const keys = /*@__PURE__*/ Object.keys(definition);
    const indexes = /*@__PURE__*/ Object.keys(keys).map((i) => +i);
    const values = /*@__PURE__*/ Object.values(definition);
    return /*@__PURE__*/ new Function("d", `[${indexes.map((i) => "k" + i).join()}]`, `[${indexes.map((i) => "s" + i).join()}]`, `[${indexes.map((i) => "d" + i).join()}]`, `return d(${as}(c,d)=>{${indexes
        .map((i) => `${aw}s${i}(c,d[${nameOf(keys[i])}])`)
        .join(";")}},${as}(c)=>{const d=${definition instanceof Array ? "[]" : "{}"};${indexes
        .map((i) => `d[${nameOf(keys[i])}]=${aw}d${i}(c)`)
        .join(";")};return d})`)(define_1.define, keys, 
    /*@__PURE__*/ values.map(({ ser }) => ser), 
    /*@__PURE__*/ values.map(({ des }) => des));
}
exports.createStructSerDes = createStructSerDes;
//# sourceMappingURL=createStructSerDes.js.map