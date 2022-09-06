import { TokenPayload } from '@autoline/shared/common/types/types';
import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { AuthRequest } from '@common/types/types';
import { verifyToken } from '@helpers/token/token';
import { Role } from '@prisma/client';
import { Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

const guestAccess = {
  ALLOWED: true,
  DISALLOWED: false,
};

const availableFor =
  (roles: Role[], guestIsAllowed: boolean) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token = req.headers['authorization'];

    if (token) {
      token = token.replace('Bearer ', '');
      const payload = verifyToken(token) as TokenPayload;

      if (roles.includes(payload.role as Role)) {
        if (req.route.path !== '/users/:id') {
          req.tokenPayload = payload;
        }
        return next();
      }
    }
    if (guestIsAllowed === guestAccess.ALLOWED) {
      return next();
    }
    if (guestIsAllowed === guestAccess.DISALLOWED) {
      res.status(httpStatus.FORBIDDEN).json({
        message: ExceptionMessage.NOT_ENOUGH_PERMISSIONS,
      });
    }
  };

const guestAuthMiddleware = availableFor(
  [Role.user, Role.admin],
  guestAccess.ALLOWED,
);
const userAuthMiddleware = availableFor(
  [Role.user, Role.admin],
  guestAccess.DISALLOWED,
);
const adminAuthMiddleware = availableFor([Role.admin], guestAccess.DISALLOWED);

export { guestAuthMiddleware, userAuthMiddleware, adminAuthMiddleware };
