import { defineConfig, Options } from "tsup";

const cfg: Options = {
  splitting: true, //error triggerer
  treeshake: true, //error triggerer
  sourcemap: false,
  clean: false,
  dts: true,
  format: ["cjs", "esm"],
  minify: false,
  external: ["react", "react-dom", "next/image"],
};

const config = defineConfig([
  {
    ...cfg,
    entry: ["src/index.ts"],
    outDir: "dist",
  },
  // {
  //   ...cfg,
  //   entry: ["src/client.ts"],
  //   outDir: "dist",
  //   splitting: false,
  //   treeshake: false,
  //   esbuildOptions: (options) => {
  //     options.banner = {
  //       js: '"use client";',
  //     };
  //   },
  // },
]);

export default config;
