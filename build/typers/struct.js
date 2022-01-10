"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuple = exports.struct = void 0;
const struct = (definition) => {
    const obj = definition instanceof Array ? () => [] : () => ({});
    return {
        encode(ctx, data) {
            for (const key in definition) {
                definition[key].encode(ctx, data[key]);
            }
        },
        decode(ctx) {
            const data = obj();
            for (const key in definition) {
                data[key] = definition[key].decode(ctx);
            }
            return data;
        }
    };
};
exports.struct = struct;
const tuple = (...definition) => (0, exports.struct)(definition);
exports.tuple = tuple;
//# sourceMappingURL=struct.js.map