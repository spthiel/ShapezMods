import { defineConfig } from "oxlint";

export default defineConfig({
  jsPlugins: ["eslint-plugin-simple-import-sort"],
  plugins: ["typescript", "unicorn", "oxc"],
  categories: {
    correctness: "error",
  },
  rules: {
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^\\u0000"], ["^node:"], ["^@?\\w+"], ["^@/"]],
      },
    ],
  },
  env: {
    builtin: true,
  },
});
