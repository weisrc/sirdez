"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
const context_1 = require("./context");
function use(type) {
    const ctx = (0, context_1.createContext)(1024);
    return {
        encode(data) {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const limit = ctx.bytes.length - 8;
                try {
                    ctx.i = 0;
                    type.encode(ctx, data);
                    if (ctx.i < limit) {
                        return ctx.bytes.subarray(0, ctx.i);
                    }
                }
                catch (error) {
                    if (ctx.i < limit) {
                        throw error;
                    }
                }
                (0, context_1.growContext)(ctx);
            }
        },
        decode(array) {
            return type.decode((0, context_1.contextFromArray)(array));
        }
    };
}
exports.use = use;
//# sourceMappingURL=use.js.map