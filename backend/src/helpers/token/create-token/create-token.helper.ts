import { TokenPayload } from '@autoline/shared';
import { ENV } from '@common/enums/app/env.enum';
import jwt from 'jsonwebtoken';

const createToken = (data: TokenPayload): string => {
  return jwt.sign(data, ENV.JWT.SECRET as string, {
    expiresIn: ENV.JWT.EXPIRES_IN,
  });
};

export { createToken };
