"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncRecord = void 0;
const asyncDefine_1 = require("../asyncDefine");
const asyncRecord = (sd, headSd, keySd) => (0, asyncDefine_1.asyncDefine)(async (ctx, data) => {
    const { length } = Object.keys(data);
    headSd.ser(ctx, length);
    for (const key in data) {
        keySd.ser(ctx, key);
        await sd.ser(ctx, data[key]);
    }
}, async (ctx) => {
    const length = headSd.des(ctx);
    const data = {};
    for (let i = 0; i < length; i++) {
        data[keySd.des(ctx)] = await sd.des(ctx);
    }
    return data;
});
exports.asyncRecord = asyncRecord;
//# sourceMappingURL=asyncRecord.js.map