/**
 * Make a zip archive from a file/folder on disk.
 *
 * @param fileOrFolder The path to the local file/folder.
 * @param saveAs The path for saving the zip archive file.
 */
export declare const zip: (fileOrFolder: string, saveAs: string) => void;
/**
 * Extracts the entire archive to the given location
 * @param zipFile The zip archive to extract.
 * @param extractTo Path to the save folder.
 */
export declare const unzip: (zipFile: string, extractTo: string) => void;
