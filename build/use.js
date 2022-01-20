"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
const _1 = require(".");
function use({ ser, des }) {
    const ctx = (0, _1.createContext)();
    return {
        ser,
        des,
        toBytes: (data) => (0, _1.contextSer)(ctx, ser, data).slice(0, ctx.i),
        toUnsafeBytes: (data) => (0, _1.contextSer)(ctx, ser, data).subarray(0, ctx.i),
        fromBytes: (bytes) => (0, _1.contextDes)(ctx, des, bytes)
    };
}
exports.use = use;
//# sourceMappingURL=use.js.map