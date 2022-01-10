export const asyncStruct = (definition) => {
    const obj = definition instanceof Array ? () => [] : () => ({});
    return {
        async encode(ctx, data) {
            for (const key in definition) {
                await definition[key].encode(ctx, data[key]);
            }
        },
        async decode(ctx) {
            const data = obj();
            for (const key in definition) {
                data[key] = await definition[key].decode(ctx);
            }
            return data;
        }
    };
};
export const asyncTuple = (...defintion) => asyncStruct(defintion);
//# sourceMappingURL=asyncStruct.js.map