import { resolve } from "path";
import { defineConfig, UserConfigFn } from "vite";

const create = (
  input: string,
  output: string
): ReturnType<UserConfigFn> => ({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, input),
      name: "sd",
      fileName: (format) => `${output}.${format}.js`
    }
  }
});

export default defineConfig(({ mode }) =>
  mode === "eval"
    ? create("src/index.ts", "sirdez")
    : create("src/eval.ts", "sirdez.eval")
);
