import { ENV } from '@common/enums/app/app';
import jwt from 'jsonwebtoken';

interface EmailTokenPayload {
  email: string;
  isActivated: false;
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    email: string;
  }
}

function generateMailToken(payload: EmailTokenPayload): string {
  return jwt.sign(payload, ENV.JWT.SECRET as string, {
    expiresIn: '7d',
  });
}

function validateMailToken(token: string): string | boolean {
  try {
    const { email } = <jwt.JwtPayload>(
      jwt.verify(token, ENV.JWT.SECRET as string)
    );
    return email;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
}

export { generateMailToken, validateMailToken };
