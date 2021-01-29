import fs from 'fs-extra';
import path from 'path';

import { download } from './';

const TEST_DIR = path.join(__dirname, 'test-cache');
const SAVE_AS_HTTP = path.join(TEST_DIR, 'http.dat');
const SAVE_AS_HTTPS = path.join(TEST_DIR, 'https.dat');

jest.setTimeout(15_000);

const resetTestDir = () => {
  fs.removeSync(TEST_DIR);
  fs.mkdirpSync(TEST_DIR);
};
afterAll(() => fs.removeSync(TEST_DIR));

if (!process.env.CI) {
  // git workflow doesn't have internet access
  it('http', async () => {
    resetTestDir();
    const url = 'http://speedtest.tele2.net/1MB.zip';
    expect.assertions(5);
    expect(fs.existsSync(SAVE_AS_HTTP)).toBeFalsy();

    const { mime, size } = await download(url, SAVE_AS_HTTP);
    expect(mime).toContain('application/zip');
    expect(size).toEqual(1048576);
    expect(fs.existsSync(SAVE_AS_HTTP)).toBeTruthy();
    expect(fs.lstatSync(SAVE_AS_HTTP).size).toEqual(1048576);
  });

  // git workflow doesn't have internet access
  it('https', async () => {
    resetTestDir();
    const url = 'https://www.google.com/';
    expect.assertions(4);
    expect(fs.existsSync(SAVE_AS_HTTPS)).toBeFalsy();

    const { mime } = await download(url, SAVE_AS_HTTPS);
    expect(mime).toContain('text/html');

    expect(fs.existsSync(SAVE_AS_HTTPS)).toBeTruthy();
    expect(fs.lstatSync(SAVE_AS_HTTPS).size).toBeGreaterThan(1024);
  });
} else {
  it('skip test if env.CI=true', () => {
    expect(1).toBeTruthy();
  });
}
