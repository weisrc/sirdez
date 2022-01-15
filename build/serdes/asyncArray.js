"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncArray = void 0;
const asyncDefine_1 = require("../asyncDefine");
const asyncArray = (sd, headSd) => (0, asyncDefine_1.asyncDefine)(async (ctx, data) => {
    const { length } = data;
    headSd.ser(ctx, length);
    for (let i = 0; i < length; i++) {
        await sd.ser(ctx, data[i]);
    }
}, async (ctx) => {
    const length = headSd.des(ctx);
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push(await sd.des(ctx));
    }
    return data;
});
exports.asyncArray = asyncArray;
//# sourceMappingURL=asyncArray.js.map