import { prisma } from '@data/prisma-client';

import type { ModelResponseDto } from '@autoline/shared/common/types/types';

const getNewCars = async (limit: number): Promise<ModelResponseDto[]> => {
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
      body_type: {
        select: {
          name: true,
        },
      },
      manufacture_country: {
        select: {
          name: true,
        },
      },
      users_wishlists: {
        select: {
          id: true,
          created_at: true,
        },
      },
      complectations: {
        select: {
          name: true,
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
  const cars: ModelResponseDto[] = [];
  newCars.map((car) => {
    const data = {
      id: car.id,
      createdAt: car.users_wishlists[0]?.created_at,
      wishlistId: car.users_wishlists[0]?.id,
      name: car.name,
      yearStart: car.year_start,
      yearEnd: car.year_end,
      photoUrls: car.photo_urls,
      brand: {
        name: car.brand.name,
        logoUrl: car.brand.logo_url,
      },
      bodyType: car.body_type.name,
      manufactureCountry: car.manufacture_country.name,
      pricesRanges: car.prices_ranges,
      description: car.description,
    } as ModelResponseDto;
    cars.push(data);
  });

  return cars;
};

export { getNewCars };
