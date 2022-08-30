/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  createWriteStream,
  readdirSync,
  readFileSync,
  writeFileSync
} from "fs";
import { get } from "https";
import { result2config } from "./result2config";

const names: string[] = [];

for (const fileName of readdirSync("docs/perf")) {
  if (fileName.endsWith(".png")) continue;
  if (fileName === "index.json") continue;

  const result = JSON.parse(
    readFileSync("docs/perf/" + fileName, "utf8")
  );

  const config = result2config(result, false);

  const url =
    "https://image-charts.com/chart.js/2.8.0?height=200&encoding=base64&bkg=transparent&c=" +
    btoa(JSON.stringify(config));

  const name = fileName.slice(0, -5);

  names.push(name);

  const file = createWriteStream(`docs/perf/${name}.png`);
  get(url, (res) => res.pipe(file));
}

writeFileSync("docs/perf/index.json", JSON.stringify(names));
