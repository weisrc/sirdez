"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utf8 = void 0;
const { utf8Write, utf8Slice } = Buffer.prototype;
exports.utf8 = {
    encode(ctx, data) {
        ctx.i += utf8Write.call(ctx.bytes, data, ctx.i);
    },
    decode: (ctx, size) => utf8Slice.call(ctx.bytes, ctx.i, (ctx.i += size))
};
//# sourceMappingURL=utf8.js.map