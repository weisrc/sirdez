import { Suite } from "benchmark";
import { mkdirSync, writeFileSync } from "fs";

export function suite(
  file: string,
  id: string,
  items: Record<string, () => void>
) {
  console.log(`*** ${id} ***`);

  let out = {};
  try {
    out = require(`../docs/perf/${file}.json`);
  } catch {
    console.log(`creating ${file}.json...`);
  }

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

  mkdirSync("docs/perf", { recursive: true });
  writeFileSync(`docs/perf/${file}.json`, JSON.stringify(out));
}
