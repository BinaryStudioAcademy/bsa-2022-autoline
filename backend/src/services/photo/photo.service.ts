import fs from 'fs';
import stream, { PassThrough } from 'stream';

import sharp from 'sharp';

const resizePhoto = (
  path: string,
  params: sharp.ResizeOptions,
): PassThrough => {
  const readableStream = fs.createReadStream(path);
  const transformer = sharp().resize(params);
  const writableStream = new stream.PassThrough();
  return readableStream.pipe(transformer).pipe(writableStream);
};

export { resizePhoto };
