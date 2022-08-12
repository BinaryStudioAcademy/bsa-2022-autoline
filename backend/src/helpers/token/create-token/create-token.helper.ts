import { TokenPayload } from '@autoline/shared';
import { ENV } from '@common/enums/app/env.enum';
import jwt from 'jsonwebtoken';

const createToken = (data: TokenPayload, isAcceessToken = true): string =>
  jwt.sign(data, ENV.JWT.SECRET as string, {
    expiresIn: isAcceessToken ? ENV.JWT.EXPIRES_IN : ENV.JWT.REFRESH_EXPIRES_IN,
  });

export { createToken };
