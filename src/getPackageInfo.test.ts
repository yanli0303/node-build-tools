import { getPackageInfo } from './getPackageInfo';

it('default fields', () => {
  expect(getPackageInfo('webpack')).toEqual({
    'dist-tags': expect.objectContaining({
      latest: expect.stringMatching(/\d+\.\d+(\.\d+)?/),
    }),
    versions: expect.anything(),
    name: 'webpack',
    description: expect.anything(),
    version: expect.stringMatching(/\d+\.\d+(\.\d+)?/),
    license: expect.anything(),
    time: expect.anything(),
    dependencies: expect.anything(),
    devDependencies: expect.anything(),
    readmeFilename: expect.anything(),
    dist: expect.anything(),
  });
});

it('default', () => {
  expect(getPackageInfo('webpack', ['dist-tags', 'dist'])).toEqual({
    'dist-tags': expect.objectContaining({
      latest: expect.stringMatching(/\d+\.\d+(\.\d+)?/),
    }),
    dist: expect.anything(),
  });
});
