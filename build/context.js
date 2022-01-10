"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextFromArray = exports.growContext = exports.createContext = void 0;
function createContext(size = 1024) {
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
function contextFromArray(array) {
    return {
        i: 0,
        bytes: array,
        view: new DataView(array.buffer, array.byteOffset, array.byteLength)
    };
}
exports.contextFromArray = contextFromArray;
//# sourceMappingURL=context.js.map