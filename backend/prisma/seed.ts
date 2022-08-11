import { PrismaClient } from '@prisma/client';

import { BrandDTO } from '../src/dtos/cars/brand.dto';
import { PlainData } from '../src/dtos/cars/plain-data.dto';
import { brands, manufacturers } from './seeds/fetched-data/cars-data';
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

  for (const manufacturer_country of manufacturers) {
    const dataToSeed = new PlainData(manufacturer_country);
    await prisma.manufacturer_Country.create({
      data: dataToSeed,
    });
  }

  for (const brand of brands) {
    const dataToSeed = new BrandDTO(brand);
    await prisma.brand.create({
      data: dataToSeed,
    });
  }
}

main().catch((e): void => {
  // eslint-disable-next-line no-console
  console.log(e);
});
