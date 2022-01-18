"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.record = void 0;
const define_1 = require("../define");
const record = (sd, headSd, keySd) => (0, define_1.define)((ctx, data) => {
    const { length } = Object.keys(data);
    headSd.ser(ctx, length);
    for (const key in data) {
        keySd.ser(ctx, key);
        sd.ser(ctx, data[key]);
    }
}, (ctx) => {
    const length = headSd.des(ctx);
    const data = {};
    for (let i = 0; i < length; i++) {
        data[keySd.des(ctx)] = sd.des(ctx);
    }
    return data;
});
exports.record = record;
//# sourceMappingURL=record.js.map