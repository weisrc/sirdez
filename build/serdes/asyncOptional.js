"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncOptional = void 0;
const asyncDefine_1 = require("../asyncDefine");
const asyncOptional = (sd) => (0, asyncDefine_1.asyncDefine)(async (ctx, data) => {
    if (data == undefined) {
        ctx.view.setUint8(ctx.i++, 0);
    }
    else {
        ctx.view.setUint8(ctx.i++, 1);
        await sd.ser(ctx, data);
    }
}, async (ctx) => ctx.view.getUint8(ctx.i++) ? await sd.des(ctx) : undefined);
exports.asyncOptional = asyncOptional;
//# sourceMappingURL=asyncOptional.js.map