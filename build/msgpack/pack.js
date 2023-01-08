"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pack = void 0;
const __1 = require("..");
const array_1 = require("./array");
const int_1 = require("./int");
const map_1 = require("./map");
function pack(ctx, data, floatHead, float, str) {
    switch (data) {
        case null:
            __1.uint8.ser(ctx, 0xc0);
            return;
        case false:
            __1.uint8.ser(ctx, 0xc2);
            return;
        case true:
            __1.uint8.ser(ctx, 0xc3);
            return;
    }
    switch (typeof data) {
        case "number":
            if (Number.isInteger(data)) {
                (0, int_1.packInt)(ctx, data);
            }
            else {
                __1.uint8.ser(ctx, floatHead);
                float(ctx, data);
            }
            return;
        case "string":
            str(ctx, data);
            return;
        case "object":
            if (Array.isArray(data)) {
                (0, array_1.packArray)(ctx, data, floatHead, float, str);
                return;
            }
            (0, map_1.packMap)(ctx, data, floatHead, float, str);
            return;
    }
}
exports.pack = pack;
//# sourceMappingURL=pack.js.map