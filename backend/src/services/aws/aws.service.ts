import * as fs from 'fs';

import { ENV } from '@common/enums/app/env.enum';
import { FormidableFile } from '@common/types/file/file';
import { HttpError } from '@dtos/execptions/error.dto';
import AWS from 'aws-sdk';
import httpStatus from 'http-status-codes';
import { v4 as uuid } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: ENV.AWS.ACCESS_KEY_ID,
  secretAccessKey: ENV.AWS.SECRET_ACCESS_KEY,
  region: 'eu-west-1',
});

const uploadFileToS3 = async (file: FormidableFile): Promise<string> => {
  const imagePath = file.path;
  const blob = fs.readFileSync(imagePath);

  const params = {
    Bucket: ENV.AWS.BUCKET_NAME || '',
    Key: `user-images/${uuid()}.${file.type.split('/')[1]}`,
    Body: blob,
  };
  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(error, httpStatus.INTERNAL_SERVER_ERROR);
    } else {
      throw error;
    }
  }
};

export { uploadFileToS3 };
