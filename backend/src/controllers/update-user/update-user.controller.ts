import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { TypedRequestBody } from '@common/types/types';
import { UpdateUserDto } from '@dtos/user/update-user.dto';
import { Role, Sex } from '@prisma/client';
import { uploadFileToS3 } from '@services/aws/aws.service';
import * as userService from '@services/user/user.service';
import { Request, NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

export interface UpdateUserReq {
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
    if (!req.files) {
      throw new Error('Failed upload S3');
    }

    const photoUrl = await uploadFileToS3(req.files.photo);
    await userService.updateUserPhoto(req.tokenPayload.sub, photoUrl);
    return res.status(httpStatus.OK).json({ photoUrl });
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
