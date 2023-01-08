"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpack = void 0;
const __1 = require("..");
const array_1 = require("./array");
const map_1 = require("./map");
function unpack(ctx, encoding) {
    const byte = ctx.view.getUint8(ctx.i++);
    switch (byte) {
        case 0xc0:
            return null;
        case 0xc2:
            return false;
        case 0xc3:
            return true;
        case 0xca:
            return __1.float32.des(ctx);
        case 0xcb:
            return __1.float64.des(ctx);
        case 0xcc:
            return __1.uint8.des(ctx);
        case 0xcd:
            return __1.uint16.des(ctx);
        case 0xce:
            return __1.uint32.des(ctx);
        case 0xcf:
            return Number(__1.bigUint64.des(ctx));
        case 0xd0:
            return __1.int8.des(ctx);
        case 0xd1:
            return __1.int16.des(ctx);
        case 0xd2:
            return __1.int32.des(ctx);
        case 0xd3:
            return Number(__1.bigInt64.des(ctx));
        case 0xd9:
            return encoding.decode(ctx, __1.uint8.des(ctx));
        case 0xda:
            return encoding.decode(ctx, __1.uint16.des(ctx));
        case 0xdb:
            return encoding.decode(ctx, __1.uint32.des(ctx));
        case 0xdc:
            return (0, array_1.unpackArrayBody)(ctx, __1.uint16.des(ctx), encoding);
        case 0xdd:
            return (0, array_1.unpackArrayBody)(ctx, __1.uint32.des(ctx), encoding);
        case 0xde:
            return (0, map_1.unpackMapBody)(ctx, __1.uint16.des(ctx), encoding);
        case 0xdf:
            return (0, map_1.unpackMapBody)(ctx, __1.uint32.des(ctx), encoding);
    }
    if (byte < 0x80)
        return byte;
    if (byte < 0x90)
        return (0, map_1.unpackMapBody)(ctx, byte - 0x80, encoding);
    if (byte < 0xa0)
        return (0, array_1.unpackArrayBody)(ctx, byte - 0x90, encoding);
    if (byte < 0xc0)
        return encoding.decode(ctx, byte - 0xa0);
    if (byte >= 0xe0)
        return byte - 0x100;
    throw new Error("Unsupported type");
}
exports.unpack = unpack;
//# sourceMappingURL=unpack.js.map