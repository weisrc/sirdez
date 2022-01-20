"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.latin1 = void 0;
exports.latin1 = {
    encode(ctx, data) {
        const { length } = data;
        for (let i = 0; i < length; i++) {
            ctx.view.setUint8(ctx.i++, data.charCodeAt(i));
        }
    },
    decode(ctx, size) {
        const codes = new Array(size);
        for (let i = 0; i < size; i++) {
            codes[i] = ctx.view.getUint8(ctx.i++);
        }
        return String.fromCharCode(...codes);
    }
};
//# sourceMappingURL=latin1.js.map