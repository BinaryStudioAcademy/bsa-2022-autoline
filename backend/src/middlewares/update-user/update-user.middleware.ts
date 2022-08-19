import { ErrorMessage, updateUserSchema } from '@autoline/shared';
import { ExceptionMessage } from '@common/enums/exception/exception';
import { TypedRequestBody } from '@common/types/controller/controller';
import { UpdateUser } from '@controllers/update-user/update-user.controller';
import { prisma } from '@data/prisma-client';
import { validatePassword } from '@services/password-validation/password-validation.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const updateUserMiddleware = async (
  req: TypedRequestBody<UpdateUser>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await updateUserSchema.validate(req.body);
    await emailExist(req);
    await passwordValidate(req);

    next();
  } catch (err) {
    const { message } = err as ErrorMessage;
    console.error(err);
    res.status(httpStatus.FORBIDDEN).json({ error: message });
    next(err);
  }
};

const emailExist = async (req: TypedRequestBody<UpdateUser>): Promise<void> => {
  if (req.body.email) {
    const existedUser = await prisma.user.findFirst({
      where: {
        id: {
          not: req.body.tokenPayload.sub,
        },
        email: req.body.email,
      },
    });
    if (existedUser) {
      throw new Error(ExceptionMessage.USER_EXISTS);
    }
  }
};

const passwordValidate = async (
  req: TypedRequestBody<UpdateUser>,
): Promise<void> => {
  if (req.body.password) {
    if (req.body.new_password != req.body.repeat_new_password) {
      throw new Error('Bad passwords');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: req.body.tokenPayload.sub,
      },
      include: {
        User_Security: true,
      },
    });

    const passwordMatches = await validatePassword(
      req.body.password,
      findUser?.User_Security,
    );

    if (!passwordMatches) {
      throw new Error('Bad passwords');
    }
  }
};

export { updateUserMiddleware };
