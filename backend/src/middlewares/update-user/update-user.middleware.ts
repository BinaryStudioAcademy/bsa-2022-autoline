import { ErrorMessage, updateUserSchema } from '@autoline/shared';
import { TypedRequestBody } from '@common/types/controller/controller';
import { UpdateUserReq } from '@controllers/update-user/update-user.controller';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const updateUserMiddleware = async (
  req: TypedRequestBody<UpdateUserReq>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await updateUserSchema.validate(req.body);
    await passwordValidate(req);

    next();
  } catch (err) {
    const { message } = err as ErrorMessage;
    console.error(err);
    res.status(httpStatus.FORBIDDEN).json({ error: message });
    next(err);
  }
};

const passwordValidate = async (
  req: TypedRequestBody<UpdateUserReq>,
): Promise<void> => {
  if (req.body.password) {
    if (req.body.newPassword !== req.body.repeatNewPassword) {
      throw new Error('Bad passwords');
    }
  }
};

export { updateUserMiddleware };