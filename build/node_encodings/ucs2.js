"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ucs2 = void 0;
const { ucs2Write, ucs2Slice } = Buffer.prototype;
exports.ucs2 = {
    encode(ctx, data) {
        ctx.i += ucs2Write.call(ctx.bytes, data, ctx.i);
    },
    decode: (ctx, size) => ucs2Slice.call(ctx.bytes, ctx.i, (ctx.i += size))
};
//# sourceMappingURL=ucs2.js.map