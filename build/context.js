"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextFromBytes = exports.contextDes = exports.contextSer = exports.growContext = exports.createContext = void 0;
function createContext(size = 4096) {
    const buffer = new ArrayBuffer(size);
    return {
        i: 0,
        view: new DataView(buffer),
        bytes: new Uint8Array(buffer)
    };
}
exports.createContext = createContext;
function growContext(ctx) {
    ctx.bytes = new Uint8Array(ctx.bytes.length * 2);
    ctx.view = new DataView(ctx.bytes.buffer);
}
exports.growContext = growContext;
function contextSer(ctx, ser, data) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const limit = ctx.bytes.length - 8;
        ctx.i = 0;
        try {
            ser(ctx, data);
            if (ctx.i < limit)
                return ctx.bytes;
        }
        catch (error) {
            if (ctx.i < limit && !(error instanceof RangeError))
                throw error;
        }
        growContext(ctx);
    }
}
exports.contextSer = contextSer;
function contextDes(ctx, des, bytes) {
    const { length } = bytes;
    if (length < 4096) {
        ctx.bytes.set(bytes);
        ctx.i = 0;
    }
    else {
        ctx = contextFromBytes(bytes);
    }
    const data = des(ctx);
    if (ctx.i !== length)
        throw RangeError(`Expected to process ${length} bytes, processed ${ctx.i} bytes instead`);
    return data;
}
exports.contextDes = contextDes;
function contextFromBytes(array) {
    return {
        i: 0,
        bytes: array,
        view: new DataView(array.buffer, array.byteOffset, array.byteLength)
    };
}
exports.contextFromBytes = contextFromBytes;
//# sourceMappingURL=context.js.map