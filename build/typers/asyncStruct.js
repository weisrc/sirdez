"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncTuple = exports.asyncStruct = void 0;
const asyncStruct = (definition) => {
    const obj = definition instanceof Array ? () => [] : () => ({});
    return {
        async encode(ctx, data) {
            for (const key in definition) {
                await definition[key].encode(ctx, data[key]);
            }
        },
        async decode(ctx) {
            const data = obj();
            for (const key in definition) {
                data[key] = await definition[key].decode(ctx);
            }
            return data;
        }
    };
};
exports.asyncStruct = asyncStruct;
const asyncTuple = (...defintion) => (0, exports.asyncStruct)(defintion);
exports.asyncTuple = asyncTuple;
//# sourceMappingURL=asyncStruct.js.map