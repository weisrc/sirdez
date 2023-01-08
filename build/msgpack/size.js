"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strSize = exports.packSize = void 0;
const __1 = require("..");
function packSize(ctx, size, a, b) {
    if (size < 16) {
        __1.uint8.ser(ctx, a + size);
    }
    else if (size < 65536) {
        __1.uint8.ser(ctx, b);
        __1.uint16.ser(ctx, size);
    }
    else {
        __1.uint8.ser(ctx, b + 1);
        __1.uint32.ser(ctx, size);
    }
}
exports.packSize = packSize;
exports.strSize = {
    ser(ctx, size) {
        if (size < 32) {
            __1.uint8.ser(ctx, 0xa0 + size);
        }
        else if (size < 256) {
            __1.uint8.ser(ctx, 0xd9);
            __1.uint8.ser(ctx, size);
        }
        else if (size < 65536) {
            __1.uint8.ser(ctx, 0xda);
            __1.uint16.ser(ctx, size);
        }
        else {
            __1.uint8.ser(ctx, 0xdb);
            __1.uint32.ser(ctx, size);
        }
    }
};
//# sourceMappingURL=size.js.map