"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgpack = void 0;
const define_1 = require("../define");
const __1 = require("..");
const pack_1 = require("./pack");
const size_1 = require("./size");
const unpack_1 = require("./unpack");
const msgpack = (encoding, single = false
// ...exts: [number, ClazzSerdes<unknown>][]
) => {
    // const demap = new Map(exts);
    // const enmap = new Map(exts.map(([type, ext]) => [ext.clazz, type]));
    const { ser: float } = single ? __1.float32 : __1.float64;
    const head = single ? 0xca : 0xcb;
    const { ser: str } = (0, __1.string)(encoding, size_1.strSize);
    return (0, define_1.define)((ctx, data) => (0, pack_1.pack)(ctx, data, head, float, str), (ctx) => (0, unpack_1.unpack)(ctx, encoding));
};
exports.msgpack = msgpack;
//# sourceMappingURL=index.js.map