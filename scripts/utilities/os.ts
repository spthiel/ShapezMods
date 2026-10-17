import {
  exec,
  type ExecException,
  type ExecOptions,
  execSync as execSyncChild,
  type ExecSyncOptionsWithStringEncoding,
} from "node:child_process";

/**
 * Builds an options object for {@link child_process.exec} that contains all necessary environment variables.
 *
 * @returns options to pass to {@link child_process.exec} of node.
 */
function getExecConfig(): ExecOptions {
  const env: Record<string, string | undefined> = {
    ...process.env,
  };

  if ("getuid" in process) {
    env["USER_ID"] = process.getuid!().toString();
    env["GROUP_ID"] = process.getgid!().toString();
  }

  return {
    env,
    cwd: process.cwd(),
  };
}

/**
 * Promise wrapper for node.child_process.exec
 *
 * @param command The command to execute
 * @param additionalOptions Further options for exec if necessary
 * @returns stdout if execution was successful or stderr on error.
 */
async function execPromise(
  command: string,
  additionalOptions: Partial<ExecOptions> = {},
): Promise<string> {
  console.log(`$ ${command}`);

  return new Promise((resolve, reject) => {
    const childProcess = exec(
      command,
      {
        ...getExecConfig(),
        ...additionalOptions,
      },
      (error: ExecException | null, stdout: string | Buffer) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout.toString());
        }
      },
    );

    childProcess.stdout!.pipe(process.stdout);
    childProcess.stderr!.pipe(process.stderr);
  });
}

/**
 * Wrapper for node.child_process.execSync
 *
 * @param command The command to execute
 * @param additionalOptions Further options for exec if necessary
 * @returns stdout if execution was successful or stderr on error.
 */
function execSync(
  command: string,
  additionalOptions: Partial<ExecSyncOptionsWithStringEncoding> = {},
): string {
  const options: ExecSyncOptionsWithStringEncoding = {
    ...getExecConfig(),
    stdio: "ignore",
    encoding: "utf-8",
    ...additionalOptions,
  };

  console.log(`$ ${command}`);
  options.stdio = "inherit";

  return execSyncChild(command, options);
}

export default {
  execSync,
  execPromise,
};
