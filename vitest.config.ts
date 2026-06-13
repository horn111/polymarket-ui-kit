import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "html"],
      include: ["packages/*/src/**/*.{ts,tsx}"]
    }
  },
  resolve: {
    alias: {
      "@polymarket-ui-kit/core": "/packages/core/src/index.ts",
      "@polymarket-ui-kit/react": "/packages/react/src/index.ts"
    }
  }
});

