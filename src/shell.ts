import ps from 'child_process';

/**
 * Execute shell commands.
 *
 * @remarks
 * - `stdio` are inherited.
 * - There is a NPM package named `shelljs`, it is designed to
 * make commands cross-platform which isn't our goal.
 *
 * @param cmd The command or commands to execute.
 * @param cwd Current working directory, defaults to `process.cwd()`.
 * @param options Additional `child_process.ExecSyncOptions`.
 */
export const shell = (
  cmd: string | string[],
  cwd?: string,
  options?: ps.ExecSyncOptions,
) => {
  const settings: ps.ExecSyncOptions = {
    cwd: cwd || process.cwd(),
    stdio: 'inherit',
    windowsHide: true,
    ...(options || {}),
  };

  const commands = Array.isArray(cmd) ? cmd : [cmd];
  for (const command of commands) {
    console.log(`\n${command}`);
    ps.execSync(command, settings);
  }
};
