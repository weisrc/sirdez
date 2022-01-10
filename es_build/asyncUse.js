import { contextFromArray, createContext } from "./context";
export function asyncUse(type) {
    let size = 64;
    return {
        async encode(data) {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const ctx = createContext(size);
                const limit = ctx.bytes.length - 8;
                try {
                    ctx.i = 0;
                    await type.encode(ctx, data);
                    if (ctx.i < limit) {
                        return ctx.bytes.subarray(0, ctx.i);
                    }
                }
                catch (error) {
                    if (ctx.i < limit) {
                        throw error;
                    }
                }
                size = ctx.i * 2;
            }
        },
        decode(array) {
            return type.decode(contextFromArray(array));
        }
    };
}
//# sourceMappingURL=asyncUse.js.map