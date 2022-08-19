import { CONFIG } from '@configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (token: string): string | JwtPayload =>
  jwt.verify(token, CONFIG.JWT.SECRET as string);

export { verifyToken };
