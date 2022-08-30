import { ENV } from '@common/enums/app/env.enum';
import { HttpError } from '@dtos/execptions/error.dto';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, ENV.JWT.SECRET as string);
  } catch (error) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      throw new HttpError(error, 401);
    } else {
      throw error;
    }
  }
};

export { verifyToken };
