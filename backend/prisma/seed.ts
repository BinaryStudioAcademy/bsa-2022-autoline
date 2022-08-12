import { PrismaClient } from '@prisma/client';

import { users } from './seeds/users';
import { users_security } from './seeds/users-security';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  for (const user_security of users_security) {
    await prisma.user_Security.create({
      data: user_security,
    });
  }
}

main().catch((e): void => {
  console.log(e);
});
