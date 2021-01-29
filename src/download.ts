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
  options: http.RequestOptions | https.RequestOptions = {},
) =>
  new Promise<{ mime?: string; size: number }>((resolve, reject) => {
    const fail = (...args: any[]) => {
      if (fs.existsSync(saveAs)) {
        fs.unlinkSync(saveAs);
      }

      reject(...args);
    };

    const lib = url.toLowerCase().startsWith('https://') ? https : http;
    const write = (res: http.IncomingMessage) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400) {
        const { location } = res.headers;
        if (location) {
          lib.get(location, options, write);
          return;
        }

        fail(
          new Error(
            `"location" header not found for HTTP ${res.statusCode} response.`,
          ),
        );
        return;
      }

      const mime = res.headers['content-type'];
      const size = res.headers['content-length'];
      const fileInfo = {
        mime,
        size: size ? parseInt(size, 10) : -1,
      };

      const file = fs.createWriteStream(saveAs);
      res.pipe(file);

      file.on('finish', () => {
        file.close();

        // Wait for a moment to let file close.
        setTimeout(() => resolve(fileInfo), fileCloseDelay);
      });

      file.on('error', fail);
    };

    lib.get(url, options, write).on('error', fail);
  });
