"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
const string = (sequencer, header) => ({
    encode(ctx, data) {
        const head = ctx.i;
        header.encode(ctx, 0);
        const begin = ctx.i;
        sequencer.encode(ctx, data);
        const end = ctx.i;
        const size = end - begin;
        ctx.i = head;
        header.encode(ctx, size);
        ctx.i = end;
    },
    decode(ctx) {
        return sequencer.decode(ctx, header.decode(ctx) + ctx.i);
    }
});
exports.string = string;
//# sourceMappingURL=string.js.map