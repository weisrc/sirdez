"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
const define_1 = require("../define");
const string = (encoding, headSd) => (0, define_1.define)((ctx, data) => {
    const head = ctx.i;
    headSd.ser(ctx, 0);
    const begin = ctx.i;
    encoding.encode(ctx, data);
    const end = ctx.i;
    const size = end - begin;
    ctx.i = head;
    headSd.ser(ctx, size);
    ctx.i = end;
}, (ctx) => encoding.decode(ctx, headSd.des(ctx) + ctx.i));
exports.string = string;
//# sourceMappingURL=string.js.map