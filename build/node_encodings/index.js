"use strict";
/* istanbul ignore file */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utf8js = void 0;
__exportStar(require("./utf8"), exports);
__exportStar(require("./latin1"), exports);
__exportStar(require("./ucs2"), exports);
var encodings_1 = require("../encodings");
Object.defineProperty(exports, "utf8js", { enumerable: true, get: function () { return encodings_1.utf8js; } });
//# sourceMappingURL=index.js.map