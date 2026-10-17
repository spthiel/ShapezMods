import { type PathLike } from "node:fs";
import * as path from "node:path";

import consts from "../utilities/consts.ts";
import fileSystem from "../utilities/fileSystem.ts";
import os from "../utilities/os.ts";

async function initGit(location: PathLike) {
  os.execSync(`git clone https://github.com/tobspr-games/shapez.io.git "${location}"`);
}

async function updateGit(location: PathLike) {
  os.execSync(`git reset --hard "@{u}"`, { cwd: `${location}` });
  os.execSync(`git clean -df`, { cwd: `${location}` });
  os.execSync(`git pull`, { cwd: `${location}` });
}

async function run() {
  const tempDirLocation = consts.shapezPath;

  if (
    (await fileSystem.exists(tempDirLocation)) &&
    (await fileSystem.exists(path.join(tempDirLocation, ".git")))
  ) {
    await updateGit(tempDirLocation);
  } else {
    await initGit(tempDirLocation);
  }
}

run();
