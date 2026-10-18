import { defineConfig } from "oxlint";

import paths from "./paths.json" with { type: "json" };

function buildImportGroups() {
  const groups: string[][] = [["^\\u0000"], ["^node:"], ["^@?\\w+"]];
  const customPaths = paths.compilerOptions.paths;

  for (let path in customPaths) {
    if (!Object.hasOwn(customPaths, path)) {
      continue;
    }

    groups.push([`^${path.replace("*", "")}`]);
  }

  return groups;
}

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
        groups: buildImportGroups(),
      },
    ],
  },
  env: {
    builtin: true,
  },
});
