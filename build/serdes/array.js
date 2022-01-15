"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = void 0;
const define_1 = require("../define");
const array = (sd, headSd) => (0, define_1.define)((ctx, data) => {
    const { length } = data;
    headSd.ser(ctx, length);
    for (let i = 0; i < length; i++) {
        sd.ser(ctx, data[i]);
    }
}, (ctx) => {
    const length = headSd.des(ctx);
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push(sd.des(ctx));
    }
    return data;
});
exports.array = array;
//# sourceMappingURL=array.js.map