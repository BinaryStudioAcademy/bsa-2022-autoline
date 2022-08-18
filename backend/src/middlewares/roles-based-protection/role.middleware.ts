import { TokenPayload } from '@autoline/shared/common/types/types';
import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { TypedRequestBody } from '@common/types/controller/controller';
import { verifyToken } from '@helpers/token/token';
import { Role } from '@prisma/client';
import { Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

const availableFor =
  (roles: Role[]) =>
  (
    req: TypedRequestBody<{ tokenPayload: TokenPayload }>,
    res: Response,
    next: NextFunction,
  ): void => {
    let token = req.headers['authorization'];

    if (token) {
      token = token.replace('Bearer ', '');
      const payload = verifyToken(token) as TokenPayload;

      if (roles.includes(payload.role as Role)) {
        req.body.tokenPayload = payload;
        return next();
      }
    }
    res.status(httpStatus.FORBIDDEN).json({
      message: ExceptionMessage.NOT_ENOUGH_PERMISSIONS,
    });
  };

const userAuthMiddleware = availableFor([Role.user, Role.admin]);
const adminAuthMiddleware = availableFor([Role.admin]);

export { userAuthMiddleware, adminAuthMiddleware };
