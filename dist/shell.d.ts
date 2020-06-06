/**
 * Execute shell commands.
 *
 * @remarks
 * `stdio` are inherited.
 *
 * @param cmd The command or commands to execute.
 * @param cwd Current working directory, defaults to `process.cwd()`;
 */
export declare const shell: (cmd: string | string[], cwd?: string | undefined) => void;
