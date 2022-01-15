"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncDefine = void 0;
const context_1 = require("./context");
function asyncDefine(ser, des) {
    const ctx = (0, context_1.createContext)();
    return {
        ser,
        des,
        async toBytes(data) {
            await (0, context_1.asyncContextSer)(ctx, ser, data);
            return ctx.bytes.slice(0, ctx.i);
        },
        async toTempBytes(data) {
            await (0, context_1.asyncContextSer)(ctx, ser, data);
            return ctx.bytes.subarray(0, ctx.i);
        },
        fromBytes(buf) {
            return des((0, context_1.contextFromBytes)(buf));
        }
    };
}
exports.asyncDefine = asyncDefine;
//# sourceMappingURL=asyncDefine.js.map