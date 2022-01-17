import { Suite } from "benchmark";
import { mkdirSync, writeFileSync } from "fs";

let out = {};
try {
  out = require("../docs/benchmark.json");
} catch {
  console.log("benchmark.json not found");
}

export function suite(id: string, items: Record<string, () => void>) {
  console.log(`*** ${id} ***`);

  out[id] = {};
  const entries = Object.entries(items);
  const s = new Suite(id);
  for (const [id, fn] of entries) {
    s.add(id, fn);
  }
  s.on("cycle", (event) => {
    console.log(String(event.target));
  });
  s.run();
  for (let i = 0; i < entries.length; i++) {
    const { name, hz } = s[i];
    out[id][name] = Math.round(hz);
  }
}

process.on("exit", () => {
  mkdirSync("docs", { recursive: true });
  writeFileSync("docs/benchmark.json", JSON.stringify(out));
});
