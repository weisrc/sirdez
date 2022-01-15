"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utf16 = void 0;
exports.utf16 = {
    encode(ctx, data) {
        const { length } = data;
        for (let i = 0; i < length; i++) {
            ctx.view.setUint16(ctx.i, data.charCodeAt(i));
            ctx.i += 2;
        }
    },
    decode(ctx, end) {
        const codes = [];
        while (ctx.i < end) {
            codes.push(ctx.view.getUint16(ctx.i));
            ctx.i += 2;
        }
        return String.fromCharCode.apply(null, codes);
    }
};
//# sourceMappingURL=utf16.js.map