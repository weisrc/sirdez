"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.latin1 = void 0;
const { latin1Write, latin1Slice } = Buffer.prototype;
exports.latin1 = {
    encode(ctx, data) {
        ctx.i += latin1Write.call(ctx.bytes, data, ctx.i);
    },
    decode: (ctx, size) => latin1Slice.call(ctx.bytes, ctx.i, (ctx.i += size))
};
//# sourceMappingURL=latin1.js.map