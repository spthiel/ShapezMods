import fs from "node:fs/promises";
import path from "node:path";

import { createPatch } from "diff";

import consts from "../utilities/consts.ts";

async function run() {
  const newString = await fs.readFile(consts.typesPath, "utf-8");
  await import("./buildShapezTypes.ts");
  const oldString = await fs.readFile(consts.typesPath, "utf-8");
  const patch = createPatch(path.relative(".", consts.typesPath), oldString, newString);
  await fs.writeFile(consts.typesPatch, patch, "utf-8");
}

run();
