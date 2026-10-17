import fileSystem from "../utilities/fileSystem.ts";
import os from "../utilities/os.ts";

async function run() {
  os.execSync("yarn gulp build.standalone-steam", {
    cwd: fileSystem.shapezGulpPath(),
    env: {
      ...process.env,
      NODE_OPTIONS: "--openssl-legacy-provider",
    },
  });
  os.execSync("yarn gulp standalone.standalone-steam.prepare", {
    cwd: fileSystem.shapezGulpPath(),
    env: {
      ...process.env,
      NODE_OPTIONS: "--openssl-legacy-provider",
    },
  });
  os.execSync("yarn gulp standalone.standalone-steam.package.linux64", {
    cwd: fileSystem.shapezGulpPath(),
    env: {
      ...process.env,
      NODE_OPTIONS: "--openssl-legacy-provider",
    },
  });
}

run();
