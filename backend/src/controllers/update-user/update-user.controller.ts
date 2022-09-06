import { TokenPayload } from '@autoline/shared';
import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { TypedRequestBody } from '@common/types/controller/controller';
import { UpdateUserDto } from '@dtos/user/update-user.dto';
import { uploadFileToS3 } from '@services/aws/aws.service';
import { Role, Sex } from '@prisma/client';
import * as userService from '@services/user/user.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

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
  req: TypedRequestBody<{ tokenPayload: TokenPayload }>,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<void> => {
  try {
    await userService.deleteUser(req.body.tokenPayload.sub);
    res.status(httpStatus.OK).json();
  } catch (error) {
    next(error);
  }
};

const getUser = async (
  req: TypedRequestBody<{ tokenPayload: TokenPayload }>,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userService.getUser(req.body.tokenPayload.sub);
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
  req: TypedRequestBody<{ tokenPayload: TokenPayload; provider: string }>,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<void> => {
  try {
    await userService.deleteOauthConnections(
      req.body.tokenPayload.sub,
      req.body.provider,
    );
    res.status(httpStatus.OK).json();
  } catch (error) {
    next(error);
  }
};

const updateUserPhoto = async (
  /* eslint-disable */
  req: any,
  res: Response<Partial<UpdateUserReq>>,
  next: NextFunction,
): Promise<Response | undefined> => {
  try {
    if (req.files) {
      const photoUrl = await uploadFileToS3(req.files.photo);
      await userService.updateUserPhoto(req.body.tokenPayload.sub, photoUrl);
      return res.status(httpStatus.OK).json({ photoUrl });
    }

    throw new Error('Failed upload S3');
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
};
