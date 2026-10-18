import fs from "node:fs/promises";
import path from "node:path";

import { build } from "rolldown";

import consts from "../utilities/consts.ts";

const DEV = !!process.env.DEV;

async function buildMod(modName: string) {
  const folder = DEV ? "dev" : "prod";

  await build({
    input: path.join(consts.modsFolder, modName, "src/index.ts"),
    output: {
      file: path.join("dist", folder, `${modName.toLowerCase()}.mod.js`),
      format: "esm",
      minify: !DEV,
    },
  });
}

async function run() {
  const modNames = await fs.readdir(consts.modsFolder);

  const promises = [];

  for (const modName of modNames) {
    promises.push(buildMod(modName));
  }

  await Promise.all(promises);
}

run();
