"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = void 0;
const optional = (typer) => ({
    encode(ctx, data) {
        if (data == undefined) {
            ctx.view.setUint8(ctx.i++, 0);
        }
        else {
            ctx.view.setUint8(ctx.i++, 1);
            typer.encode(ctx, data);
        }
    },
    decode(ctx) {
        if (ctx.view.getUint8(ctx.i++)) {
            return typer.decode(ctx);
        }
    }
});
exports.optional = optional;
//# sourceMappingURL=optional.js.map