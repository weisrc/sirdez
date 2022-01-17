/* eslint-disable @typescript-eslint/ban-ts-comment */

import { createWriteStream, readdirSync, readFileSync } from "fs";
import { get } from "https";

interface Dataset {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
}

for (const fileName of readdirSync("docs/perf")) {
  if (fileName.endsWith(".png")) continue;

  const result = JSON.parse(
    readFileSync("docs/perf/" + fileName, "utf8")
  );

  const labels: string[] = [];
  const datasetMap: Record<string, Dataset> = {};

  for (const [suiteName, suite] of Object.entries(result)) {
    labels.push(suiteName);
    for (const [name, hz] of Object.entries(suite)) {
      if (!datasetMap[name]) {
        datasetMap[name] = {
          label: name,
          data: []
        };
      }
      datasetMap[name].data.push(hz);
    }
  }

  const config = {
    type: "bar",
    data: {
      labels,
      datasets: Object.values(datasetMap)
    }
  };

  const url =
    "https://image-charts.com/chart.js/2.8.0?height=200&encoding=base64&bkg=transparent&c=" +
    btoa(JSON.stringify(config));

  const file = createWriteStream(
    `docs/perf/${fileName.slice(0, -5)}.png`
  );
  get(url, (res) => res.pipe(file));
}
