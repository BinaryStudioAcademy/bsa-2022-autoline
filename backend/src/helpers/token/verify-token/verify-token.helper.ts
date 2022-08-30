import { ENV } from '@common/enums/app/env.enum';
import { HttpError } from '@dtos/execptions/error.dto';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, ENV.JWT.SECRET as string);
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(error, httpStatus.UNAUTHORIZED);
    } else {
      throw error;
    }
  }
};

export { verifyToken };
