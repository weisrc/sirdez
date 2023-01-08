"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rec = void 0;
const define_1 = require("../define");
const rec = (sd) => (0, define_1.define)((ctx, data) => sd().ser(ctx, data), (ctx) => sd().des(ctx));
exports.rec = rec;
//# sourceMappingURL=rec.js.map