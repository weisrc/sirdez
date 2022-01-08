import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    preset: "ts-jest",
    setupFiles: ["./test/fixtures/text.ts"],
    coverageReporters: ["html-spa", "json", "json-summary", "text"],
    reporters: [
      "default",
      [
        "jest-stare",
        {
          resultDir: "report",
          reportTitle: "Report",
          coverageLink: "../coverage"
        }
      ]
    ]
  };
};
