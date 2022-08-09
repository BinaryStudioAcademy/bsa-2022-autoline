import { ENV } from '@common/enums/app/env.enum';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, ENV.JWT.SECRET as string);
};

export { verifyToken };
