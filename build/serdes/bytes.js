"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytes = void 0;
const define_1 = require("../define");
const bytes = (headSd) => (0, define_1.define)((ctx, data) => {
    const { byteLength } = data;
    headSd.ser(ctx, byteLength);
    ctx.bytes.set(data, ctx.i);
    ctx.i += byteLength;
}, (ctx) => {
    const byteLength = headSd.des(ctx);
    return ctx.bytes.subarray(ctx.i, (ctx.i += byteLength));
});
exports.bytes = bytes;
//# sourceMappingURL=bytes.js.map