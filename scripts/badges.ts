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

const reportPercent = numPassedTests / numTotalTests;

function percentToColor(percent: number) {
  return `hsl(${(percent * 120).toFixed()}, 100%, 50%)`;
}

const report: Badge = {
  schemaVersion: 1,
  label: "report",
  namedLogo: "jest",
  message: (reportPercent * 100).toFixed(2) + "%",
  color: percentToColor(reportPercent)
};

const coverage: Badge = {
  schemaVersion: 1,
  label: "coverage",
  namedLogo: "jest",
  message: total.lines.pct + "%",
  color: percentToColor(total.lines.pct / 100)
};

writeFileSync("report/badge.json", JSON.stringify(report));
writeFileSync("coverage/badge.json", JSON.stringify(coverage));
