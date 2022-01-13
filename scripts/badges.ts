/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mkdirSync, writeFileSync } from "fs";
// @ts-ignore
import { total } from "../docs/coverage/coverage-summary.json";
import {
  numPassedTests,
  numFailedTests
  // @ts-ignore
} from "../docs/report.json";

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

function percentToColor(percent: number) {
  return `hsl(${(percent * 120).toFixed()}, 100%, 40%)`;
}

function createBadge(path: string, badge: Badge) {
  writeFileSync(path, JSON.stringify(badge));
}

createBadge("docs/report-badge.json", {
  schemaVersion: 1,
  label: "report",
  namedLogo: "jest",
  message: `${numPassedTests} passed, ${numFailedTests} failed`,
  color: percentToColor(numFailedTests ? 0 : 1)
});

createBadge("docs/coverage-badge.json", {
  schemaVersion: 1,
  label: "coverage",
  namedLogo: "jest",
  message: total.lines.pct + "%",
  color: percentToColor(total.lines.pct / 100)
});
