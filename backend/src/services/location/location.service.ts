import { prisma } from '@data/prisma-client';
import { City } from '@prisma/client';

const getCities = async (regionId: string): Promise<Partial<City>[]> => {
  return prisma.city.findMany({
    where: { region_id: regionId },
    select: {
      id: true,
      name: true,
    },
  });
};

export { getCities };
