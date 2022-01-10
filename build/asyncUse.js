"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncUse = void 0;
const context_1 = require("./context");
function asyncUse(type) {
    let size = 64;
    return {
        async encode(data) {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const ctx = (0, context_1.createContext)(size);
                const limit = ctx.bytes.length - 8;
                try {
                    ctx.i = 0;
                    await type.encode(ctx, data);
                    if (ctx.i < limit) {
                        return ctx.bytes.subarray(0, ctx.i);
                    }
                }
                catch (error) {
                    if (ctx.i < limit) {
                        throw error;
                    }
                }
                size = ctx.i * 2;
            }
        },
        decode(array) {
            return type.decode((0, context_1.contextFromArray)(array));
        }
    };
}
exports.asyncUse = asyncUse;
//# sourceMappingURL=asyncUse.js.map