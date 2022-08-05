const SALT_ROUNDS = 10;

import { genSalt, hash } from 'bcrypt';

const bcryptHash = async (value: string): Promise<string> => {
  const salt = await genSalt(SALT_ROUNDS);
  return hash(value, salt);
};

export { bcryptHash };
