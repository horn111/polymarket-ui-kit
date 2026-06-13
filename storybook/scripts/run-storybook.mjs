import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const command = process.argv[2] === "dev" ? "dev" : "build";
const localHome = join(process.cwd(), ".cache", "storybook-home");
mkdirSync(localHome, { recursive: true });

const args =
  command === "dev"
    ? ["storybook", "dev", "-p", "6006", "-c", ".storybook", "--disable-telemetry"]
    : ["storybook", "build", "-c", ".storybook", "--disable-telemetry"];

const child = spawn(process.platform === "win32" ? "pnpm.cmd" : "pnpm", ["exec", ...args], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    HOME: localHome,
    USERPROFILE: localHome,
    STORYBOOK_DISABLE_TELEMETRY: "1"
  }
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
