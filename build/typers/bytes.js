"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytes = void 0;
const bytes = (header) => ({
    encode(ctx, data) {
        const { byteLength } = data;
        header.encode(ctx, byteLength);
        ctx.bytes.set(data, ctx.i);
        ctx.i += byteLength;
    },
    decode(ctx) {
        const byteLength = header.decode(ctx);
        return ctx.bytes.subarray(ctx.i, (ctx.i += byteLength));
    }
});
exports.bytes = bytes;
//# sourceMappingURL=bytes.js.map