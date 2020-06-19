import fs from 'fs-extra';
import path from 'path';

import { download } from './';

const TEST_DIR = path.join(__dirname, 'test-cache');
const SAVE_AS_HTTP = path.join(TEST_DIR, 'http.dat');
const SAVE_AS_HTTPS = path.join(TEST_DIR, 'https.dat');

jest.setTimeout(15_000);
beforeAll(() => {
  fs.removeSync(TEST_DIR);
  fs.mkdirpSync(TEST_DIR);
});
afterAll(() => fs.removeSync(TEST_DIR));

it('http', async () => {
  const url = 'http://speedtest.tele2.net/1MB.zip';
  expect.assertions(3);
  expect(fs.existsSync(SAVE_AS_HTTP)).toBeFalsy();

  await download(url, SAVE_AS_HTTP);
  expect(fs.existsSync(SAVE_AS_HTTP)).toBeTruthy();
  expect(fs.lstatSync(SAVE_AS_HTTP).size).toBeGreaterThan(1024);
});

it('https', async () => {
  const url = 'https://www.google.com/';
  expect.assertions(3);
  expect(fs.existsSync(SAVE_AS_HTTPS)).toBeFalsy();

  await download(url, SAVE_AS_HTTPS);
  expect(fs.existsSync(SAVE_AS_HTTPS)).toBeTruthy();
  expect(fs.lstatSync(SAVE_AS_HTTPS).size).toBeGreaterThan(1024);
});
