import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import typesTransformer from "../typescript/typesTransformer.ts";
import consts from "../utilities/consts.ts";

async function run() {
  execSync("yarn tsc -p ./tsconfig.json", { cwd: consts.shapezPath });
  const types = await fs.readFile(path.join(consts.shapezPath, "types.d.ts"), "utf-8");

  await fs.writeFile(consts.typesPath, typesTransformer.transformTypes(types), "utf-8");
}

await run();
