"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextFromBytes = exports.contextDes = exports.asyncContextSer = exports.contextSer = exports.growContext = exports.createContext = void 0;
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
                return;
        }
        catch (error) {
            if (ctx.i < limit)
                throw error;
        }
        growContext(ctx);
    }
}
exports.contextSer = contextSer;
async function asyncContextSer(ctx, ser, data) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const limit = ctx.bytes.length - 8;
        ctx.i = 0;
        try {
            await ser(ctx, data);
            if (ctx.i < limit)
                return;
        }
        catch (error) {
            if (ctx.i < limit)
                throw error;
        }
        growContext(ctx);
    }
}
exports.asyncContextSer = asyncContextSer;
function contextDes(ctx, des, buf) {
    const { length } = buf;
    if (length < 4096) {
        ctx.bytes.set(buf);
        ctx.i = 0;
        return des(ctx);
    }
    else {
        return des(contextFromBytes(buf));
    }
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