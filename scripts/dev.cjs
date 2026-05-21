const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const nextBin = require.resolve("next/dist/bin/next");
const port = "3000";
const nextDevCachePath = path.join(process.cwd(), ".next", "dev");

try {
  fs.rmSync(nextDevCachePath, { recursive: true, force: true });
} catch (error) {
  console.warn("No se pudo limpiar .next/dev antes de iniciar:", error);
}

const child = spawn(process.execPath, [nextBin, "dev", "--webpack", "-p", port], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "development",
    PORT: port,
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
