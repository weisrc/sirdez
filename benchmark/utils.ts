import { Suite } from "benchmark";
import {
  appendFileSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from "fs";

const { GITHUB_SHA } = process.env;

const $sha = GITHUB_SHA ? GITHUB_SHA.slice(0, 7) : undefined;

mkdirSync("docs", { recursive: true });

function log(id: string, data: unknown) {
  const json = JSON.stringify(data);
  console.log(id + ": " + json);
  appendFileSync(`docs/${id}.benchmark.log`, json + "\n");
}

export function suite(id: string, items: Record<string, () => void>) {
  const out = { $sha };
  const entries = Object.entries(items);
  const s = new Suite(id);
  for (const [id, fn] of entries) {
    s.add(id, fn);
  }
  s.run();
  for (let i = 0; i < entries.length; i++) {
    const { name, hz } = s[i];
    out[name] = Math.round(hz);
  }

  let index = [];
  try {
    index = JSON.parse(readFileSync("docs/benchmark.log", "utf8"));
  } catch {
    console.log("docs/benchmark.log not found");
  }
  if (!index.includes(id)) index.push(id);
  writeFileSync("docs/benchmark.log", JSON.stringify(index));
  log(id, out);
}
