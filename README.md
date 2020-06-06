# node-build-tools

Utility Node.js scripts for CI jobs.

## Usage

### npm

```sh
npm install node-build-tools
```

### yarn

```sh
yarn add node-build-tools
```

### git submodule

```sh
git submodule add git@github.com:yanli0303/node-build-tools.git
git submodule update --init --recursive
```

Then, import to your project like:

```js
const { shell } = require('./node-build-tools');
shell('echo hello world');
```

## Also check out

- https://github.com/felixrieseberg/windows-build-tools
