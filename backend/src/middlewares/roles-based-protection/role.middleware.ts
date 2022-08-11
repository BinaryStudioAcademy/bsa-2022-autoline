import { TokenPayload } from '@autoline/shared';
import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { TypedRequestBody } from '@common/types/controller/controller';
import { verifyToken } from '@helpers/token/token';
import { Role } from '@prisma/client';
import { Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

const hasRole =
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
        next();
        return;
      }
    }
    res.status(httpStatus.FORBIDDEN).json({
      message: ExceptionMessage.NOT_ENOUGH_PERMISSIONS,
    });
  };

const userAuthMiddleware = hasRole([Role.user, Role.admin]);
const adminAuthMiddleware = hasRole([Role.admin]);

export { userAuthMiddleware, adminAuthMiddleware };
