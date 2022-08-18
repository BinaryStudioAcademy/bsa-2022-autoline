import { TokenPayload } from '@autoline/shared/common/types/types';
import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { TypedRequestBody } from '@common/types/controller/controller';
import { verifyToken } from '@helpers/token/token';
import { Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

const userSigned =
  () =>
  (
    req: TypedRequestBody<{ userId: string }>,
    res: Response,
    next: NextFunction,
  ): void => {
    let token = req.headers['authorization'];

    if (token) {
      token = token.replace('Bearer ', '');
      const payload = verifyToken(token) as TokenPayload;
      req.body.userId = payload.sub;
      return next();
    }
    res.status(httpStatus.FORBIDDEN).json({
      message: ExceptionMessage.NOT_ENOUGH_PERMISSIONS,
    });
  };

const userSignedMiddleware = userSigned();

export { userSignedMiddleware };
