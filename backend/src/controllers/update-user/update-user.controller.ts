import fs from 'fs';
import stream from 'stream';

import { TokenPayload } from '@autoline/shared';
import { S3Folders } from '@common/enums/aws/aws';
import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { ProfileImageSize } from '@common/enums/image/image';
import { TypedRequestBody } from '@common/types/controller/controller';
import { UpdateUserDto } from '@dtos/user/update-user.dto';
import { UsersHelper } from '@helpers/helpers';
import { Role, Sex } from '@prisma/client';
import { uploadFileToS3 } from '@services/aws/aws.service';
import * as userService from '@services/user/user.service';
import { Request, NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

export interface UpdateUserReq {
  tokenPayload: TokenPayload;
  newPassword?: string;
  repeatNewPassword?: string;
  password?: string;
  name: string;
  birthYear?: number | null;
  sex?: Sex | null;
  phone?: string | null;
  email: string;
  location?: string | null;
  photoUrl?: string | null;
  role?: Role | null;
  isGoogleConnected: boolean;
  isFacebookConnected: boolean;
}

const updateUser = async (
  req: TypedRequestBody<UpdateUserReq>,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = UpdateUserDto.createFromRequest(req);
    const result = await userService.updateUser(user);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (
  req: Request,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<void> => {
  try {
    await userService.deleteUser(req.tokenPayload.sub);
    res.status(httpStatus.OK).json();
  } catch (error) {
    next(error);
  }
};

const getUser = async (
  req: Request,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userService.getUser(req.tokenPayload.sub);
    if (user) {
      res.status(httpStatus.OK).json(user);
    } else {
      throw new Error(ExceptionMessage.UNAUTHORIZED_USER);
    }
  } catch (error) {
    next(error);
  }
};

const deleteOauthConnections = async (
  req: TypedRequestBody<{ provider: string }>,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<void> => {
  try {
    await userService.deleteOauthConnections(
      req.tokenPayload.sub,
      req.body.provider,
    );
    res.status(httpStatus.OK).json();
  } catch (error) {
    next(error);
  }
};

const updateUserPhoto = async (
  /* eslint-disable-next-line */
  req: any,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    if (!req.files) throw new Error('Failed upload S3');

    const file = req.files.photo;
    if (!file) throw new Error('No file provided');

    const readableStream = fs.createReadStream(file.path);
    const fileName = `${uuid()}.${file.type.split('/')[1]}`;
    const s3Key = `${S3Folders.USER_IMAGES}/${fileName}`;
    const transformer = sharp().resize({
      width: ProfileImageSize.WIDTH,
      height: ProfileImageSize.HEIGHT,
    });
    const writableStream = new stream.PassThrough();
    readableStream.pipe(transformer).pipe(writableStream);

    const photoUrl = await uploadFileToS3(writableStream, s3Key);
    await UsersHelper.deleteUserPhoto(req.body.tokenPayload.sub);
    await userService.updateUserPhoto(req.body.tokenPayload.sub, photoUrl);

    return res.status(httpStatus.OK).json({ photoUrl });
  } catch (error) {
    next(error);
  }
};

const deleteUserPhoto = async (
  req: Request,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    await UsersHelper.deleteUserPhoto(req.tokenPayload.sub);
    return res.status(httpStatus.OK).json();
  } catch (error) {
    next(error);
  }
};

export {
  updateUser,
  deleteUser,
  getUser,
  deleteOauthConnections,
  updateUserPhoto,
  deleteUserPhoto,
};
