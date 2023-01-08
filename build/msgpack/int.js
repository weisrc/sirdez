"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packInt = void 0;
const __1 = require("..");
const packInt = (ctx, data) => {
    if (data >= 0) {
        if (data < 128) {
            __1.uint8.ser(ctx, data);
        }
        else if (data < 256) {
            __1.uint8.ser(ctx, 0xcc);
            __1.uint8.ser(ctx, data);
        }
        else if (data < 65536) {
            __1.uint8.ser(ctx, 0xcd);
            __1.uint16.ser(ctx, data);
        }
        else if (data < 4294967296) {
            __1.uint8.ser(ctx, 0xce);
            __1.uint32.ser(ctx, data);
        }
        else {
            __1.uint8.ser(ctx, 0xcf);
            __1.bigUint64.ser(ctx, BigInt(data));
        }
    }
    else {
        if (data >= -32) {
            __1.int8.ser(ctx, data);
        }
        else if (data >= -128) {
            __1.uint8.ser(ctx, 0xd0);
            __1.int8.ser(ctx, data);
        }
        else if (data >= -32768) {
            __1.uint8.ser(ctx, 0xd1);
            __1.int16.ser(ctx, data);
        }
        else if (data >= -2147483648) {
            __1.uint8.ser(ctx, 0xd2);
            __1.int32.ser(ctx, data);
        }
        else {
            __1.uint8.ser(ctx, 0xd3);
            __1.bigInt64.ser(ctx, BigInt(data));
        }
    }
};
exports.packInt = packInt;
//# sourceMappingURL=int.js.map