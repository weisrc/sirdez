export const bytes = (header) => ({
    encode(ctx, data) {
        const { byteLength } = data;
        header.encode(ctx, byteLength);
        ctx.bytes.set(data, ctx.i);
        ctx.i += byteLength;
    },
    decode(ctx) {
        const byteLength = header.decode(ctx);
        return ctx.bytes.subarray(ctx.i, (ctx.i += byteLength));
    }
});
//# sourceMappingURL=bytes.js.map