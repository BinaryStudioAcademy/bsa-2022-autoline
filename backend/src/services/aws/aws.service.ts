import { PassThrough } from 'stream';

import { ENV } from '@common/enums/app/env.enum';
import { S3Folders } from '@common/enums/aws/s3-folders';
import { HttpError } from '@dtos/execptions/error.dto';
import AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import httpStatus from 'http-status-codes';
import { v4 as uuid } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: ENV.AWS.ACCESS_KEY_ID,
  secretAccessKey: ENV.AWS.SECRET_ACCESS_KEY,
  region: 'eu-west-1',
});

const parseS3KeyFromUrl = (url: string): string => {
  const { pathname } = new URL(url);
  if (!pathname) throw new Error('Can`t parse key from url');
  return pathname.substring(1);
};

const generateS3Key = (folder: S3Folders, type: string): string => {
  const fileName = `${uuid()}.${type.split('/')[1]}`;
  return `${folder}/${fileName}`;
};

const uploadFileToS3 = async (
  body: ManagedUpload.SendData | PassThrough,
  s3Key: string,
): Promise<string> => {
  try {
    const params = {
      Bucket: ENV.AWS.BUCKET_NAME || '',
      Key: s3Key,
      Body: body,
    };

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

const deleteFileFromS3 = async (fileKey: string): Promise<void> => {
  const params = {
    Bucket: ENV.AWS.BUCKET_NAME || '',
    Key: fileKey,
  };
  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(error, httpStatus.INTERNAL_SERVER_ERROR);
    } else {
      throw error;
    }
  }
};

export { uploadFileToS3, deleteFileFromS3, parseS3KeyFromUrl, generateS3Key };
