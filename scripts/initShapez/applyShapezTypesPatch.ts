import fs from "node:fs/promises";

import { applyPatch } from "diff";

import consts from "../utilities/consts.ts";

async function run() {
  const patch = await fs.readFile(consts.typesPatch, "utf-8");
  const types = await fs.readFile(consts.typesPath, "utf-8");
  const result = applyPatch(types, patch);
  if (!result) {
    console.error("Unable to apply shapez type patches");
    return;
  }
  await fs.writeFile(consts.typesPath, result);
}

run();
