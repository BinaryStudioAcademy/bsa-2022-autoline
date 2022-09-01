import { prisma } from '@data/prisma-client';

import type { CarPreview } from '@autoline/shared/common/types/types';

const getNewCars = async (
  limit: number,
  userId: string,
): Promise<CarPreview[]> => {
  const newCars = await prisma.model.findMany({
    take: limit,
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
    select: {
      id: true,
      name: true,
      year_start: true,
      year_end: true,
      photo_urls: true,
      description: true,
      brand: {
        select: {
          name: true,
          logo_url: true,
        },
      },
      users_wishlists: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
          created_at: true,
        },
      },
      prices_ranges: {
        select: {
          price_start: true,
          price_end: true,
        },
      },
    },
  });
  const cars: CarPreview[] = [];
  newCars.map((car) => {
    const data = {
      id: car.id,
      createdAt: car.users_wishlists[0]?.created_at,
      wishlistId: car.users_wishlists[0]?.id,
      modelName: car.name,
      yearStart: car.year_start,
      yearEnd: car.year_end,
      photoUrls: car.photo_urls,
      brand: {
        name: car.brand.name,
        logoUrl: car.brand.logo_url,
      },
      pricesRanges: car.prices_ranges,
      description: car.description,
    } as CarPreview;
    cars.push(data);
  });

  return cars;
};

export { getNewCars };
