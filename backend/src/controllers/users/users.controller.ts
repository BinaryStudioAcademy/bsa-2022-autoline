import { TokenPayload } from '@autoline/shared';
import { TypedRequest, TypedRequestQuery } from '@common/types/types';
import { errorsHandler } from '@middlewares/middlewares';
import { Role, Sex } from '@prisma/client';
import * as usersService from '@services/users/users.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

export interface UserUpdateInput {
  id: string;
  tokenPayload: TokenPayload;
  name?: string;
  sex?: Sex;
  role?: Role;
  phone?: string;
  email?: string;
  location?: string;
  photoUrl?: string;
}

const getUsers = async (
  req: TypedRequestQuery<{ name: string } | Record<string, never>>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const usersData = await usersService.getUsers(req.query.name || '');

    res.json(usersData).status(httpStatus.OK);
  } catch (error) {
    errorsHandler(error as Error, req, res, next);
  }
};

const updateUser = async (
  req: TypedRequest<{ id: string }, UserUpdateInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id: userId } = req.params;
    const { ...userData } = req.body;
    const user = await usersService.updateUser(userId, userData);

    res.json(user).status(httpStatus.OK);
  } catch (error) {
    errorsHandler(error as Error, req, res, next);
  }
};

export { getUsers, updateUser };
