import { shell } from './';

beforeEach(() => {
  global.console.log = jest.fn();
});

it('command not found', () => {
  const cmd = 'no-such-command';
  expect(() => shell(cmd, __dirname)).toThrow(`Command failed: ${cmd}`);
  expect(console.log).toHaveBeenCalledWith(`\n${cmd}`);
});

it('single command', () => {
  const cmd = 'echo single';
  shell(cmd, __dirname);
  expect(console.log).toHaveBeenCalledWith(`\n${cmd}`);
});

it('multiple commands', () => {
  const commands = ['echo hello', 'echo world'];
  shell(commands, __dirname);

  expect(console.log).toHaveBeenCalledTimes(2);
  for (const cmd of commands) {
    expect(console.log).toHaveBeenCalledWith(`\n${cmd}`);
  }
});
