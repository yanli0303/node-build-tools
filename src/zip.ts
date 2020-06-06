import Zip from 'adm-zip';
import fs from 'fs';

/**
 * Make a zip archive from a file/folder on disk.
 *
 * @param fileOrFolder The path to the local file/folder.
 * @param saveAs The path for saving the zip archive file.
 */
export const zip = (fileOrFolder: string, saveAs: string) => {
  const isDirectory = fs.lstatSync(fileOrFolder).isDirectory();
  const zip = new Zip();
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
export const unzip = (zipFile: string, extractTo: string) => {
  const zip = new Zip(zipFile);
  zip.extractAllTo(extractTo);
};
