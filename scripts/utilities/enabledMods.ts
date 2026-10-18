import fs from "node:fs/promises";
import path from "node:path";

import fileSystem from "./fileSystem.ts";

const enabledModsFile = path.resolve("enabled-mods.json");

async function getEnabledMods(): Promise<string[]> {
  if (!(await fileSystem.exists(enabledModsFile))) {
    return [];
  }

  try {
    return JSON.parse(await fs.readFile(enabledModsFile, "utf-8"));
  } catch {
    return [];
  }
}

async function saveEnabledMods(mods: string[]): Promise<void> {
  await fs.writeFile(enabledModsFile, JSON.stringify(mods, undefined, 2), "utf-8");
}

export default {
  getEnabledMods,
  saveEnabledMods,
};
