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
  const emailToken = jwt.sign(payload, ENV.JWT.SECRET as string, {
    expiresIn: '7d',
  });
  return emailToken;
}

function validateMailToken(token: string): string | boolean {
  try {
    const { email } = <jwt.JwtPayload>(
      jwt.verify(token, ENV.JWT.SECRET as string)
    );
    return email;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { generateMailToken, validateMailToken };
