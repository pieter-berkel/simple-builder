import { defineConfig } from "tsup";

const config = defineConfig([
  {
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["cjs", "esm"],
    dts: true,
  },
]);

export default config;
