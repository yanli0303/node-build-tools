export { default as fs } from 'fs-extra';
import ps from 'child_process';
import Zip from 'adm-zip';
import fs from 'fs';

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

/**
 * Execute shell commands.
 *
 * @remarks
 * `stdio` are inherited.
 *
 * @param cmd The command or commands to execute.
 * @param cwd Current working directory, defaults to `process.cwd()`;
 */

var shell = function shell(cmd, cwd) {
  var options = {
    cwd: cwd || process.cwd(),
    stdio: 'inherit',
    windowsHide: true
  };
  var commands = Array.isArray(cmd) ? cmd : [cmd];

  for (var _iterator = _createForOfIteratorHelperLoose(commands), _step; !(_step = _iterator()).done;) {
    var command = _step.value;
    console.log("\n" + command);
    ps.execSync(command, options);
  }
};

/**
 * Make a zip archive from a file/folder on disk.
 *
 * @param fileOrFolder The path to the local file/folder.
 * @param saveAs The path for saving the zip archive file.
 */

var zip = function zip(fileOrFolder, saveAs) {
  var isDirectory = fs.lstatSync(fileOrFolder).isDirectory();
  var zip = new Zip();

  if (isDirectory) {
    zip.addLocalFolder(fileOrFolder);
  } else {
    zip.addLocalFile(fileOrFolder);
  }

  zip.writeZip(saveAs);
};
/**
 * Extracts the entire archive to the given location
 * @param zipFile The zip archive to extract.
 * @param extractTo Path to the save folder.
 */

var unzip = function unzip(zipFile, extractTo) {
  var zip = new Zip(zipFile);
  zip.extractAllTo(extractTo);
};

export { shell, unzip, zip };
//# sourceMappingURL=node-build-tools.esm.js.map
