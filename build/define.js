"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const context_1 = require("./context");
function define(ser, des) {
    const ctx = (0, context_1.createContext)();
    return {
        ser,
        des,
        toBytes(data) {
            (0, context_1.contextSer)(ctx, ser, data);
            return ctx.bytes.slice(0, ctx.i);
        },
        toTempBytes(data) {
            (0, context_1.contextSer)(ctx, ser, data);
            return ctx.bytes.subarray(0, ctx.i);
        },
        fromBytes(buf) {
            return (0, context_1.contextDes)(ctx, des, buf);
        }
    };
}
exports.define = define;
//# sourceMappingURL=define.js.map