import { defineConfig } from "tsup";

const config = defineConfig({
  entry: [
    "src/index.ts",
    "src/core/index.ts",
    "src/core/adapters/index.ts",
    "src/adapters/next/app/index.ts",
    "src/providers/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
});

export default config;
