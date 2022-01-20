"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.float64 = exports.float32 = exports.bigInt64 = exports.int32 = exports.int16 = exports.int8 = exports.bigUint64 = exports.uint32 = exports.uint16 = exports.uint8 = void 0;
const define_1 = require("../define");
exports.uint8 = (0, define_1.define)((ctx, data) => ctx.view.setUint8(ctx.i++, data), (ctx) => ctx.view.getUint8(ctx.i++));
exports.uint16 = (0, define_1.define)((ctx, data) => {
    ctx.view.setUint16(ctx.i, data);
    ctx.i += 2;
}, (ctx) => {
    const data = ctx.view.getUint16(ctx.i);
    ctx.i += 2;
    return data;
});
exports.uint32 = (0, define_1.define)((ctx, data) => {
    ctx.view.setUint32(ctx.i, data);
    ctx.i += 4;
}, (ctx) => {
    const data = ctx.view.getUint32(ctx.i);
    ctx.i += 4;
    return data;
});
exports.bigUint64 = (0, define_1.define)((ctx, data) => {
    ctx.view.setBigUint64(ctx.i, data);
    ctx.i += 8;
}, (ctx) => {
    const data = ctx.view.getBigUint64(ctx.i);
    ctx.i += 8;
    return data;
});
exports.int8 = (0, define_1.define)((ctx, data) => ctx.view.setInt8(ctx.i++, data), (ctx) => ctx.view.getInt8(ctx.i++));
exports.int16 = (0, define_1.define)((ctx, data) => {
    ctx.view.setInt16(ctx.i, data);
    ctx.i += 2;
}, (ctx) => {
    const data = ctx.view.getInt16(ctx.i);
    ctx.i += 2;
    return data;
});
exports.int32 = (0, define_1.define)((ctx, data) => {
    ctx.view.setInt32(ctx.i, data);
    ctx.i += 4;
}, (ctx) => {
    const data = ctx.view.getInt32(ctx.i);
    ctx.i += 4;
    return data;
});
exports.bigInt64 = (0, define_1.define)((ctx, data) => {
    ctx.view.setBigInt64(ctx.i, data);
    ctx.i += 8;
}, (ctx) => {
    const data = ctx.view.getBigInt64(ctx.i);
    ctx.i += 8;
    return data;
});
exports.float32 = (0, define_1.define)((ctx, data) => {
    ctx.view.setFloat32(ctx.i, data);
    ctx.i += 4;
}, (ctx) => {
    const data = ctx.view.getFloat32(ctx.i);
    ctx.i += 4;
    return data;
});
exports.float64 = (0, define_1.define)((ctx, data) => {
    ctx.view.setFloat64(ctx.i, data);
    ctx.i += 8;
}, (ctx) => {
    const data = ctx.view.getFloat64(ctx.i);
    ctx.i += 8;
    return data;
});
const mappings = {
    uint8: exports.uint8,
    uint16: exports.uint16,
    uint32: exports.uint32,
    int8: exports.int8,
    int16: exports.int16,
    int32: exports.int32,
    float32: exports.float32,
    float64: exports.float64,
    bigUint64: exports.bigUint64,
    bigInt64: exports.bigInt64
};
const number = (kind, bitSize) => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
mappings[`${kind}${bitSize}`];
exports.number = number;
//# sourceMappingURL=number.js.map