import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    preset: "ts-jest",
    setupFiles: ["./test/fixtures/text.ts"],
    coverageReporters: ["html-spa", "json", "json-summary"],
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
    // coverageThreshold: {
    //   global: {
    //     branches: 100,
    //     functions: 100,
    //     lines: 100,
    //     statements: 100
    //   }
    // }
  };
};
