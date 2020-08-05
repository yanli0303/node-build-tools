import fs from 'fs-extra';
import path from 'path';

import { shell } from './shell';

const NPM_INFO = 'npm view --json';
const DEFAULT_INFO_FIELDS = [
  'dist-tags',
  'versions',
  'name',
  'description',
  'version',
  'license',
  'time',
  'dependencies',
  'devDependencies',
  'readmeFilename',
  'dist',
];

export const getPackageInfo = (
  packageName: string,
  fields: string[] = DEFAULT_INFO_FIELDS,
  registry?: string
) => {
  const file = `tmp${Date.now()}.json`;
  const reg = registry ? ` --registry=${registry}` : '';
  shell(
    `${NPM_INFO}${reg} ${packageName} ${fields.join(' ')} > ${file}`,
    __dirname
  );

  try {
    const data = require(`./${file}`);
    return { ...data };
  } catch (e) {
    throw e;
  } finally {
    fs.removeSync(path.join(__dirname, file));
  }
};
