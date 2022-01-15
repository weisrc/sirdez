/* eslint-disable @typescript-eslint/ban-ts-comment */

import { createWriteStream, mkdirSync } from "fs";
import { get } from "https";

// @ts-ignore
import result from "../docs/benchmark.json";

mkdirSync("docs", { recursive: true });

interface Dataset {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
}

const labels: string[] = [];
const datasetMap: Record<string, Dataset> = {};

delete result.general;

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

const file = createWriteStream("docs/benchmark-chart.png");
get(url, (res) => res.pipe(file));
