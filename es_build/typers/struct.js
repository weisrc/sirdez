export const struct = (definition) => {
    const obj = definition instanceof Array ? () => [] : () => ({});
    return {
        encode(ctx, data) {
            for (const key in definition) {
                definition[key].encode(ctx, data[key]);
            }
        },
        decode(ctx) {
            const data = obj();
            for (const key in definition) {
                data[key] = definition[key].decode(ctx);
            }
            return data;
        }
    };
};
export const tuple = (...definition) => struct(definition);
//# sourceMappingURL=struct.js.map