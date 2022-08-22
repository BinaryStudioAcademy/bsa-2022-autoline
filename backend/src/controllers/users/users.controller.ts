import { TypedRequestBody, TypedRequestQuery } from '@common/types/types';
import { errorsHandler } from '@middlewares/middlewares';
import { User } from '@prisma/client';
import * as usersService from '@services/users/users.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const getUsers = async (
  req: TypedRequestQuery<Record<string, never>>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const usersData = await usersService.getUsers();

    res.json(usersData).status(httpStatus.OK);
  } catch (error) {
    errorsHandler(error as Error, req, res, next);
  }
};

const updateUser = async (
  req: TypedRequestBody<Pick<User, 'id'> & Partial<User>>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id: userId } = req.params;
    const userData = req.body;
    const user = await usersService.updateUser(userId, userData);

    res.json(user).status(httpStatus.OK);
  } catch (error) {
    errorsHandler(error as Error, req, res, next);
  }
};

export { getUsers, updateUser };
