"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackMapBody = exports.packMap = void 0;
const pack_1 = require("./pack");
const size_1 = require("./size");
const unpack_1 = require("./unpack");
function packMap(ctx, data, floatHead, float, str) {
    const keys = Object.keys(data);
    const { length } = keys;
    (0, size_1.packSize)(ctx, length, 0x80, 0xde);
    for (let i = 0; i < length; i++) {
        const key = keys[i];
        (0, pack_1.pack)(ctx, key, floatHead, float, str);
        (0, pack_1.pack)(ctx, data[key], floatHead, float, str);
    }
}
exports.packMap = packMap;
function unpackMapBody(ctx, size, encoding) {
    const data = {};
    for (let i = 0; i < size; i++) {
        data[(0, unpack_1.unpack)(ctx, encoding)] = (0, unpack_1.unpack)(ctx, encoding);
    }
    return data;
}
exports.unpackMapBody = unpackMapBody;
//# sourceMappingURL=map.js.map