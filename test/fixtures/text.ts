/* istanbul ignore file */

import { readFileSync } from "fs";
import { resolve } from "path";

export const text = readFileSync(resolve(__dirname, "text.txt"), {
  encoding: "utf8"
});
