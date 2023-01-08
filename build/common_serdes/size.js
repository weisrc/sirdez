"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.size = exports.usize = void 0;
const define_1 = require("../define");
exports.usize = (0, define_1.define)((ctx, data) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const byte = data & 0x7f;
        data >>= 7;
        if (data) {
            ctx.view.setUint8(ctx.i++, byte | 0x80);
        }
        else {
            ctx.view.setUint8(ctx.i++, byte);
            return;
        }
    }
}, (ctx) => {
    let byte, res = 0, off = 0;
    do {
        byte = ctx.view.getUint8(ctx.i++);
        res += (byte & 0x7f) << off;
        off += 7;
    } while (byte > 0x7f);
    return res;
});
exports.size = (0, define_1.define)((ctx, data) => exports.usize.ser(ctx, data >= 0 ? data * 2 : data * -2 - 1), (ctx) => {
    const num = exports.usize.des(ctx);
    return num & 1 ? (num + 1) / -2 : num / 2;
});
//# sourceMappingURL=size.js.map