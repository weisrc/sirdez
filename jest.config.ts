import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    preset: "ts-jest",
    setupFiles: ["./test/fixture/text.ts"],
    coverageReporters: ["html-spa", "json"],
    reporters: [
      "default",
      [
        "jest-stare",
        {
          resultDir: "report",
          reportTitle: "Test Report",
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
