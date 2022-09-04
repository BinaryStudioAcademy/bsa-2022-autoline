import { ErrorMessage, editUserSchema } from '@autoline/shared';
import { TypedRequest } from '@common/types/controller/controller';
import { UserUpdateInput } from '@controllers/users/users.controller';
import { prisma } from '@data/prisma-client';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const editUserMiddleware = async (
  req: TypedRequest<{ id: string }, UserUpdateInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await editUserSchema.validate(req.body);
    const existedUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (existedUser) next(new Error('User with this email already exists!'));

    next();
  } catch (err) {
    const { message } = err as ErrorMessage;
    res.status(httpStatus.FORBIDDEN).json({ error: message });
    next(err);
  }
};

export { editUserMiddleware };
