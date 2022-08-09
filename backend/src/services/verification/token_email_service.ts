import { ENV } from '@common/enums/app/app';
import jwt from 'jsonwebtoken';

interface EmailTokenPayload {
  email: string;
  isActivated: false;
}

function generateTokens(payload: EmailTokenPayload): string {
  const emailToken = jwt.sign(payload, ENV.JWT.SECRET || 'secret', {
    expiresIn: '7d',
  });
  return emailToken;
}

export { generateTokens };
