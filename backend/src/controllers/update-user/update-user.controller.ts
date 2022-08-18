import { TokenPayload } from '@autoline/shared';
import { TypedRequestBody } from '@common/types/controller/controller';
import { UserCreateInput } from '@common/types/prisma/prisma';
import { UpdateUserDto } from '@dtos/user/update-user.dto';
import { User } from '@prisma/client';
import * as updateUserService from '@services/update-user/update-user.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

export interface UpdateUser extends UserCreateInput {
  tokenPayload: TokenPayload;
  new_password: string;
  repeat_new_password: string;
}

const updateUser = async (
  req: TypedRequestBody<UpdateUser>,
  res: Response<User>,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = UpdateUserDto.createFromRequest(req);

    const { new_password, ...userData } = user;

    const result = await updateUserService.updateUser(userData, new_password);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUser = async (
  req: TypedRequestBody<{ tokenPayload: TokenPayload }>,
  res: Response<User>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await updateUserService.deleteUser(
      req.body.tokenPayload.sub,
    );
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { updateUser, deleteUser };
