import { defineConfig } from "tsup";

const config = defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
});

export default config;
