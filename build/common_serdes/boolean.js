"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = void 0;
const define_1 = require("../define");
exports.boolean = (0, define_1.define)((ctx, data) => void ctx.view.setUint8(ctx.i++, +data), (ctx) => !!ctx.view.getUint8(ctx.i++));
//# sourceMappingURL=boolean.js.map