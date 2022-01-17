/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mkdirSync, writeFileSync } from "fs";
// @ts-ignore
import { total } from "../docs/coverage/coverage-summary.json";
// @ts-ignore
import { General as perf } from "../docs/perf/main.json";
import {
  numFailedTests,
  numPassedTests
  // @ts-ignore
} from "../docs/report/index.json";

interface Badge {
  schemaVersion: 1;
  label: string;
  message: string;
  color?: string;
  labelColor?: string;
  isError?: boolean;
  namedLogo?: string;
  logoSvg?: string;
  logoColor?: string;
  logoWidth?: number;
  logoPosition?: string;
  style?: "flat";
  cacheSeconds?: number;
}

mkdirSync("docs/badges", { recursive: true });

function percentToColor(percent: number) {
  return `hsl(${(percent * 120).toFixed()}, 100%, 40%)`;
}

function createBadge(file: string, badge: Badge) {
  writeFileSync(`docs/badges/${file}.json`, JSON.stringify(badge));
}

createBadge("report", {
  schemaVersion: 1,
  label: "report",
  namedLogo: "jest",
  message: `${numPassedTests} passed, ${numFailedTests} failed`,
  color: percentToColor(numFailedTests ? 0 : 1)
});

createBadge("coverage", {
  schemaVersion: 1,
  label: "coverage",
  namedLogo: "jest",
  message: total.lines.pct + "%",
  color: percentToColor(total.lines.pct / 100)
});

const speed = (perf.sirdez / perf.json).toFixed(2);

createBadge("perf", {
  schemaVersion: 1,
  label: "perf",
  namedLogo: "speedtest",
  message: `${speed}x JSON`,
  color: "blue"
});
