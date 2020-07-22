import fs from 'fs';
import http from 'http';
import https from 'https';

/**
 * Download file.
 *
 * @param url The file URL.
 * @param saveAs The save location.
 * @param fileCloseDelay The number of milliseconds to wait
 * after file handle is closed.
 */
export const download = (
  url: string,
  saveAs: string,
  fileCloseDelay = 3000,
  options: http.RequestOptions | https.RequestOptions = {}
) =>
  new Promise((resolve, reject) => {
    const lib = url.toLowerCase().startsWith('https://') ? https : http;
    const write = (res: http.IncomingMessage) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400) {
        const { location } = res.headers;
        if (location) {
          lib.get(location, options, write);
          return;
        }

        reject(
          new Error(
            `"location" header not found for HTTP ${res.statusCode} response.`
          )
        );
      }

      const file = fs.createWriteStream(saveAs);
      res.pipe(file);

      file.on('finish', () => {
        file.close();

        // Wait for a moment to let file close.
        setTimeout(resolve, fileCloseDelay);
      });
    };

    lib.get(url, options, write).on('error', error => {
      if (fs.existsSync(saveAs)) {
        fs.unlinkSync(saveAs);
      }

      reject(error);
    });
  });
