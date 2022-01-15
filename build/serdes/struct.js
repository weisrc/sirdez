"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuple = exports.struct = void 0;
const __1 = require("..");
const struct = (definition) => {
    const obj = definition instanceof Array ? () => [] : () => ({});
    return (0, __1.define)((ctx, data) => {
        for (const key in definition) {
            definition[key].ser(ctx, data[key]);
        }
    }, (ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = obj();
        for (const key in definition) {
            data[key] = definition[key].des(ctx);
        }
        return data;
    });
};
exports.struct = struct;
const tuple = (...definition) => (0, exports.struct)(definition);
exports.tuple = tuple;
//# sourceMappingURL=struct.js.map