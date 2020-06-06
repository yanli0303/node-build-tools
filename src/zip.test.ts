import fs from 'fs-extra';
import path from 'path';

import { unzip, zip } from './zip';

const TEST_DIR = path.join(__dirname, 'test-cache');
const FILE_ZIP = path.join(TEST_DIR, 'file.zip');
const FILE_EXTRACT_TO = path.join(TEST_DIR, 'file-extract-to');
const FOLDER_ZIP = path.join(TEST_DIR, 'folder.zip');
const FOLDER_EXTRACT_TO = path.join(TEST_DIR, 'folder-extract-to');

beforeAll(() => fs.mkdirpSync(TEST_DIR));
afterAll(() => fs.removeSync(TEST_DIR));

it('zip file', () => {
  expect(fs.existsSync(FILE_ZIP)).toBe(false);

  zip(__filename, FILE_ZIP);

  expect(fs.existsSync(FILE_ZIP)).toBe(true);
  expect(fs.lstatSync(FILE_ZIP).size).toBeGreaterThan(0);
});

it('unzip file', () => {
  expect(fs.existsSync(FILE_ZIP)).toBe(true);
  expect(fs.existsSync(FILE_EXTRACT_TO)).toBe(false);
  fs.mkdirpSync(FILE_EXTRACT_TO);

  unzip(FILE_ZIP, FILE_EXTRACT_TO);

  const extractedFile = path.join(FILE_EXTRACT_TO, path.basename(__filename));
  expect(fs.existsSync(extractedFile)).toBe(true);

  const expectedFileSize = fs.lstatSync(__filename).size;
  const actualFileSize = fs.lstatSync(extractedFile).size;
  expect(actualFileSize).toEqual(expectedFileSize);
});

it('zip folder', () => {
  expect(fs.existsSync(FOLDER_ZIP)).toBe(false);

  zip(TEST_DIR, FOLDER_ZIP);

  expect(fs.existsSync(FOLDER_ZIP)).toBe(true);
  expect(fs.lstatSync(FOLDER_ZIP).size).toBeGreaterThan(0);
});

it('unzip folder', () => {
  expect(fs.existsSync(FOLDER_ZIP)).toBe(true);
  expect(fs.existsSync(FOLDER_EXTRACT_TO)).toBe(false);
  fs.mkdirpSync(FOLDER_EXTRACT_TO);

  unzip(FOLDER_ZIP, FOLDER_EXTRACT_TO);

  let actual = path.join(FOLDER_EXTRACT_TO, path.basename(FILE_ZIP));
  expect(fs.existsSync(actual)).toBe(true);
  let expectedFileSize = fs.lstatSync(FILE_ZIP).size;
  let actualFileSize = fs.lstatSync(actual).size;
  expect(actualFileSize).toEqual(expectedFileSize);

  actual = path.join(
    FOLDER_EXTRACT_TO,
    path.basename(FILE_EXTRACT_TO),
    path.basename(__filename)
  );
  expect(fs.existsSync(actual)).toBe(true);
  expectedFileSize = fs.lstatSync(__filename).size;
  actualFileSize = fs.lstatSync(actual).size;
  expect(actualFileSize).toEqual(expectedFileSize);
});
