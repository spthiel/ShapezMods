import type { PathLike } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

import consts from "./consts.ts";

/**
 * @param path - Path to check
 * @returns whether the file by the given path exists.
 */
async function exists(path: PathLike): Promise<boolean> {
  try {
    await fs.stat(path);

    return true;
  } catch {
    return false;
  }
}

/**
 * Recursively deletes a folder.
 *
 * @param path - The folder to delete
 */
async function removeDirectoryRecursive(path: PathLike): Promise<void> {
  if (!(await exists(path))) {
    return;
  }
  await fs.rm(path, { recursive: true });
}

function shapezGulpPath() {
  return path.join(consts.shapezPath, "gulp");
}

function shapezElectronPath() {
  return path.join(consts.shapezPath, "electron");
}

export default {
  exists,
  removeDirectoryRecursive,
  shapezGulpPath,
  shapezElectronPath,
};
