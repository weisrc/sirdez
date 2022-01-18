"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
const define_1 = require("../define");
const map = (keySd, valueSd, headSd) => (0, define_1.define)((ctx, data) => {
    const { length } = Object.keys(data);
    headSd.ser(ctx, length);
    for (const key in data) {
        keySd.ser(ctx, key);
        valueSd.ser(ctx, data[key]);
    }
}, (ctx) => {
    const length = headSd.des(ctx);
    const data = {};
    for (let i = 0; i < length; i++) {
        data[keySd.des(ctx)] = valueSd.des(ctx);
    }
    return data;
});
exports.map = map;
//# sourceMappingURL=map.js.map