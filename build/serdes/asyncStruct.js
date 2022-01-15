"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncTuple = exports.asyncStruct = void 0;
const asyncDefine_1 = require("../asyncDefine");
const asyncStruct = (definition) => {
    const obj = definition instanceof Array ? () => [] : () => ({});
    return (0, asyncDefine_1.asyncDefine)(async (ctx, data) => {
        for (const key in definition) {
            await definition[key].ser(ctx, data[key]);
        }
    }, async (ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = obj();
        for (const key in definition) {
            data[key] = await definition[key].des(ctx);
        }
        return data;
    });
};
exports.asyncStruct = asyncStruct;
const asyncTuple = (...defintion) => (0, exports.asyncStruct)(defintion);
exports.asyncTuple = asyncTuple;
//# sourceMappingURL=asyncStruct.js.map