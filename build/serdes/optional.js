"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = void 0;
const define_1 = require("../define");
const optional = (sd) => (0, define_1.define)((ctx, data) => {
    if (data == undefined) {
        ctx.view.setUint8(ctx.i++, 0);
    }
    else {
        ctx.view.setUint8(ctx.i++, 1);
        sd.ser(ctx, data);
    }
}, (ctx) => (ctx.view.getUint8(ctx.i++) ? sd.des(ctx) : undefined));
exports.optional = optional;
//# sourceMappingURL=optional.js.map