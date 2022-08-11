import { TokenPayload } from '@autoline/shared';
import { CONFIG } from '@configs/config';
import jwt from 'jsonwebtoken';

const createToken = (data: TokenPayload, isAcceessToken = true): string =>
  jwt.sign(data, CONFIG.JWT.SECRET as string, {
    expiresIn: isAcceessToken
      ? CONFIG.JWT.EXPIRES_IN
      : CONFIG.JWT.REFRESH_EXPIRES_IN,
  });

export { createToken };
