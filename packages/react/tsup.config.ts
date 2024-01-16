import * as fs from "node:fs/promises";
import * as path from "node:path";
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
    onSuccess: async () => {
      const files = await fs.readdir("./dist");

      for (const file of files) {
        if (
          file.startsWith("build-container-client") &&
          (file.endsWith(".mjs") || file.endsWith(".js"))
        ) {
          const filePath = path.join("./dist", file);
          const data = await fs.readFile(filePath, "utf8");
          const updatedContent = `'use client';\n${data}`;
          await fs.writeFile(filePath, updatedContent, "utf8");
        }
      }
    },
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
