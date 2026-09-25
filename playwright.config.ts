import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  timeout: 45_000,
  workers: 2,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "docs-desktop",
      testMatch: "docs.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
        baseURL: "http://127.0.0.1:3100",
      },
    },
    {
      name: "docs-mobile",
      testMatch: "docs.spec.ts",
      use: { ...devices["Pixel 7"], baseURL: "http://127.0.0.1:3100" },
    },
    {
      name: "demo-desktop",
      testMatch: ["demo.spec.ts", "registry-themes.spec.ts"],
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
        baseURL: "http://127.0.0.1:3101",
      },
    },
    {
      name: "demo-mobile",
      testMatch: ["demo.spec.ts", "registry-themes.spec.ts"],
      use: { ...devices["Pixel 7"], baseURL: "http://127.0.0.1:3101" },
    },
  ],
  webServer: [
    {
      command: "pnpm --filter @polymarket-ui-kit/docs exec next start --port 3100",
      url: "http://127.0.0.1:3100",
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      command: "pnpm --filter @polymarket-ui-kit/demo exec next start --port 3101",
      url: "http://127.0.0.1:3101",
      reuseExistingServer: false,
      timeout: 60_000,
    },
  ],
});
