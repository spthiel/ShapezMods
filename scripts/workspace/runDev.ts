import fs from "node:fs/promises";
import path from "node:path";

import enabledMods from "../utilities/enabledMods.ts";
import os from "../utilities/os.ts";

const shapezPath = path.resolve("shapez", "build_output", "standalone-steam", "shapez-linux-x64");
const distDevPath = path.resolve("dist", "dev");

async function collectEnabledModFiles() {
  const enabled = await enabledMods.getEnabledMods();

  const files = await fs.readdir(distDevPath);

  return enabled
    .map((modName) => `${modName.toLowerCase()}.mod.js`)
    .filter((modFile) => files.includes(modFile))
    .map((modFile) => path.join(distDevPath, modFile));
}

async function run() {
  const mods = await collectEnabledModFiles();

  os.execSync(`${path.join(shapezPath, "shapezio")} --dev --load-mod="${mods.join(",")}"`);
}

run();
