import fs from "node:fs/promises";
import path from "node:path";

import consts from "../utilities/consts.ts";
import fileSystem from "../utilities/fileSystem.ts";
import os from "../utilities/os.ts";

async function run() {
  const promises: Promise<unknown>[] = [];
  promises.push(os.execPromise(`yarn`, { cwd: consts.shapezPath }));
  promises.push(os.execPromise(`yarn --ignore-optional`, { cwd: fileSystem.shapezElectronPath() }));
  promises.push(os.execPromise(`yarn`, { cwd: fileSystem.shapezGulpPath() }));

  // Write tsconfig to support nested folder structure
  promises.push(
    fs.writeFile(
      path.resolve(consts.shapezPath, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          types: [],
          skipLibCheck: true,
          allowJs: true,
          declaration: true,
          emitDeclarationOnly: true,
          outFile: "types.js",
        },
        files: ["src/js/application.js"],
        exclude: ["node_modules", "../**/*"],
      }),
      "utf-8",
    ),
  );

  await Promise.all(promises);

  // Upgrade fluent-ffmpeg to allow modern mp3 compiling
  os.execSync(`yarn upgrade gulp-fluent-ffmpeg`, {
    cwd: fileSystem.shapezGulpPath(),
  });
}

run();
