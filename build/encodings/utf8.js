"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utf8 = void 0;
const encoder = /*@__PURE__*/ new TextEncoder();
const decoder = /*@__PURE__*/ new TextDecoder();
exports.utf8 = {
    encode(ctx, data) {
        ctx.i += encoder.encodeInto(data, ctx.bytes.subarray(ctx.i))
            .written;
    },
    decode: (ctx, size) => decoder.decode(ctx.bytes.subarray(ctx.i, (ctx.i += size)))
};
//# sourceMappingURL=utf8.js.map