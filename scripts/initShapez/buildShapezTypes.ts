import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import consts from "../utilities/consts.ts";

function stripTypes(types: string): string {
  return types
    .split("\n")
    .filter((line) => !line.includes("declare"))
    .filter((line) => line !== "}")
    .filter((line) => line.trim() !== "export {};")
    .filter((line) => !line.trim().startsWith("import"))
    .join("\n");
}

async function run() {
  execSync("yarn tsc -p ./tsconfig.json", { cwd: consts.shapezPath });
  const types = await fs.readFile(path.join(consts.shapezPath, "types.d.ts"), "utf-8");

  await fs.writeFile(
    consts.typesPath,
    `
  declare namespace Shapez {
    ${stripTypes(types)}
  }
  `,
    "utf-8",
  );
}

run();
