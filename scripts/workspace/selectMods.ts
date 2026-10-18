import fs from "node:fs/promises";

import prompts, { type Choice } from "prompts";

import consts from "../utilities/consts.ts";
import enabledMods from "../utilities/enabledMods.ts";

async function run() {
  const modNames = await fs.readdir(consts.modsFolder);

  const enabled = await enabledMods.getEnabledMods();

  const result = await prompts({
    type: "multiselect",
    name: "value",
    message: "Select mods to add to dev environment",
    choices: modNames.map((modName): Choice => ({
      title: modName,
      value: modName,
      selected: enabled.includes(modName),
    })),
    hint: "- Space to select. Return to submit",
    instructions: false,
  });

  await enabledMods.saveEnabledMods(result.value);
}

run();
