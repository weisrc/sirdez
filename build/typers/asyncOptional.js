"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncOptional = void 0;
const asyncOptional = (typer) => ({
    async encode(ctx, data) {
        if (data == undefined) {
            ctx.view.setUint8(ctx.i++, 0);
        }
        else {
            ctx.view.setUint8(ctx.i++, 1);
            await typer.encode(ctx, data);
        }
    },
    async decode(ctx) {
        if (ctx.view.getUint8(ctx.i++)) {
            return await typer.decode(ctx);
        }
    }
});
exports.asyncOptional = asyncOptional;
//# sourceMappingURL=asyncOptional.js.map