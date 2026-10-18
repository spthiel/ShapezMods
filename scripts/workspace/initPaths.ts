import fs from "node:fs/promises";
import path from "node:path";

import consts from "../utilities/consts.ts";

const staticPaths: Record<string, string[]> = {
  "@/*": ["./src/"],
  "shared:*": ["./src/shared/*"],
};

async function run() {
  const modNames = await fs.readdir(consts.modsFolder);
  const paths = { ...staticPaths };

  for (const name of modNames) {
    paths[`${name.toLowerCase()}:*`] = [`./z_mods/${name}/src/*`];
  }

  await fs.writeFile(
    path.resolve("paths.json"),
    JSON.stringify(
      {
        compilerOptions: {
          paths,
        },
      },
      undefined,
      4,
    ),
    "utf-8",
  );
}

run();
