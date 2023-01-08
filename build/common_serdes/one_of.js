"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneOf = exports.InvalidOneOfType = void 0;
const define_1 = require("../define");
class InvalidOneOfType extends Error {
    type;
    constructor(type) {
        super(`Invalid oneOf type (${type})`);
        this.type = type;
    }
}
exports.InvalidOneOfType = InvalidOneOfType;
const oneOf = (headSd, typeToSerdes) => {
    const types = Object.keys(typeToSerdes);
    const typeToInt = mapKeysToIndexes(types);
    const intToType = swapKeysAndValues(typeToInt);
    return (0, define_1.define)((ctx, data) => {
        const i = typeToInt[data.type];
        headSd.ser(ctx, i);
        const serdes = typeToSerdes[data.type];
        serdes.ser(ctx, data.value);
    }, (ctx) => {
        const i = headSd.des(ctx);
        const type = intToType[i];
        if (type === undefined) {
            throw new InvalidOneOfType(i);
        }
        const serdes = typeToSerdes[type];
        const value = serdes.des(ctx);
        return { type, value };
    });
};
exports.oneOf = oneOf;
function mapKeysToIndexes(keys) {
    const result = {};
    for (let i = 0; i < keys.length; ++i) {
        const e = keys[i];
        result[e] = i;
    }
    return result;
}
function swapKeysAndValues(obj) {
    const result = {};
    for (const k of Object.keys(obj)) {
        const v = obj[k];
        result[v] = k;
    }
    return result;
}
//# sourceMappingURL=one_of.js.map