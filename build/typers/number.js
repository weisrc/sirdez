"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.float64 = exports.float32 = exports.bigInt64 = exports.int32 = exports.int16 = exports.int8 = exports.bigUint64 = exports.uint32 = exports.uint16 = exports.uint8 = void 0;
exports.uint8 = {
    encode(ctx, data) {
        ctx.view.setUint8(ctx.i++, data);
    },
    decode(ctx) {
        return ctx.view.getUint8(ctx.i++);
    }
};
exports.uint16 = {
    encode(ctx, data) {
        ctx.view.setUint16(ctx.i, data);
        ctx.i += 2;
    },
    decode(ctx) {
        const data = ctx.view.getUint16(ctx.i);
        ctx.i += 2;
        return data;
    }
};
exports.uint32 = {
    encode(ctx, data) {
        ctx.view.setUint32(ctx.i, data);
        ctx.i += 4;
    },
    decode(ctx) {
        const data = ctx.view.getUint32(ctx.i);
        ctx.i += 4;
        return data;
    }
};
exports.bigUint64 = {
    encode(ctx, data) {
        ctx.view.setBigUint64(ctx.i, data);
        ctx.i += 8;
    },
    decode(ctx) {
        const data = ctx.view.getBigUint64(ctx.i);
        ctx.i += 8;
        return data;
    }
};
exports.int8 = {
    encode(ctx, data) {
        ctx.view.setInt8(ctx.i++, data);
    },
    decode(ctx) {
        return ctx.view.getInt8(ctx.i++);
    }
};
exports.int16 = {
    encode(ctx, data) {
        ctx.view.setInt16(ctx.i, data);
        ctx.i += 2;
    },
    decode(ctx) {
        const data = ctx.view.getInt16(ctx.i);
        ctx.i += 2;
        return data;
    }
};
exports.int32 = {
    encode(ctx, data) {
        ctx.view.setInt32(ctx.i, data);
        ctx.i += 4;
    },
    decode(ctx) {
        const data = ctx.view.getInt32(ctx.i);
        ctx.i += 4;
        return data;
    }
};
exports.bigInt64 = {
    encode(ctx, data) {
        ctx.view.setBigInt64(ctx.i, data);
        ctx.i += 8;
    },
    decode(ctx) {
        const data = ctx.view.getBigInt64(ctx.i);
        ctx.i += 8;
        return data;
    }
};
exports.float32 = {
    encode(ctx, data) {
        ctx.view.setFloat32(ctx.i, data);
        ctx.i += 4;
    },
    decode(ctx) {
        const data = ctx.view.getFloat32(ctx.i);
        ctx.i += 4;
        return data;
    }
};
exports.float64 = {
    encode(ctx, data) {
        ctx.view.setFloat64(ctx.i, data);
        ctx.i += 8;
    },
    decode(ctx) {
        const data = ctx.view.getFloat64(ctx.i);
        ctx.i += 8;
        return data;
    }
};
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
const number = (kind, size) => mappings[`${kind}${size}`];
exports.number = number;
//# sourceMappingURL=number.js.map