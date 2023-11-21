/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "turbo"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    tsConfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
      "./packages/*/tsconfig.json",
      "./examples/*/tsconfig.json",
    ],
  },
  rules: {
    "no-undef": "off",
  },
};

module.exports = config;
