import {
  numPassedTests,
  numTotalTests
} from "../report/jest-results.json";
import { writeFileSync } from "fs";

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

import { total } from "../coverage/coverage-summary.json";

function percentToColor(percent: number) {
  return `hsl(${(percent * 120).toFixed()}, 100%, 40%)`;
}

function createBadge(path: string, badge: Badge) {
  writeFileSync(path + "/badge.json", JSON.stringify(badge));
}

const reportPercent = numPassedTests / numTotalTests;

createBadge("report", {
  schemaVersion: 1,
  label: "report",
  namedLogo: "jest",
  message: (reportPercent * 100).toFixed(2) + "%",
  color: percentToColor(reportPercent)
});

createBadge("coverage", {
  schemaVersion: 1,
  label: "coverage",
  namedLogo: "jest",
  message: total.lines.pct + "%",
  color: percentToColor(total.lines.pct / 100)
});
