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
  registry?: string,
) => {
  const cwd = process.cwd();
  const reg = registry ? ` --registry=${registry}` : '';
  const [json] = shell(
    `${NPM_INFO}${reg} ${packageName} ${fields.join(' ')}`,
    cwd,
  );

  try {
    return JSON.parse(json);
  } catch (e) {
    throw e;
  }
};
