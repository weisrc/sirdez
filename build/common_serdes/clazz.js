"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clazz = void 0;
const clazz = (clazz, sd) => ({
    clazz,
    ser: sd.ser,
    des: (ctx) => Object.assign(new clazz(), sd.des(ctx))
});
exports.clazz = clazz;
//# sourceMappingURL=clazz.js.map