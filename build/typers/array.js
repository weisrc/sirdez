"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = void 0;
const array = (typer, header) => ({
    encode(ctx, data) {
        const { length } = data;
        header.encode(ctx, length);
        for (let i = 0; i < length; i++) {
            typer.encode(ctx, data[i]);
        }
    },
    decode(ctx) {
        const length = header.decode(ctx);
        const data = [];
        for (let i = 0; i < length; i++) {
            data.push(typer.decode(ctx));
        }
        return data;
    }
});
exports.array = array;
//# sourceMappingURL=array.js.map