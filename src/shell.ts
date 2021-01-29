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
 * @returns The stdout from the commands in order.
 */
export const shell = (
  cmd: string | string[],
  cwd?: string,
  options?: ps.ExecSyncOptions,
): string[] => {
  const settings: ps.ExecSyncOptions = {
    cwd: cwd || process.cwd(),
    windowsHide: true,
    ...(options || {}),
  };

  const commands = Array.isArray(cmd) ? cmd : [cmd];
  const outputs: string[] = [];
  for (const command of commands) {
    console.log(`\n${command}`);
    const output = ps.execSync(command, settings);
    outputs.push(`${output || ''}`);
  }

  return outputs;
};
