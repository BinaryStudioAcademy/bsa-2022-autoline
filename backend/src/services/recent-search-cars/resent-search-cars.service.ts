import { prisma } from '@data/prisma-client';

import type {
  RecentSearchCarsResponse,
  RecentSearchRequestDto,
} from '@autoline/shared/common/types/types';

const getRecentSearchCars = async (
  userId: string,
  take: number,
): Promise<RecentSearchCarsResponse[]> => {
  const recentSearchCars = await prisma.users_Searches_Cars.findMany({
    take,
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    select: {
      model_id: true,
      model: {
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
          prices_ranges: {
            select: {
              price_start: true,
              price_end: true,
            },
          },
        },
      },
    },
  });

  const cars: RecentSearchCarsResponse[] = [];
  recentSearchCars.map((car) => {
    const data = {
      id: car.model.id,
      modelName: car.model.name,
      yearStart: car.model.year_start,
      yearEnd: car.model.year_end,
      photoUrls: car.model.photo_urls,
      brand: {
        name: car.model.brand.name,
        logoUrl: car.model.brand.logo_url,
      },
      pricesRanges: car.model.prices_ranges,
      description: car.model.description,
    } as RecentSearchCarsResponse;
    cars.push(data);
  });

  return cars;
};

const addCarToRecentSearch = async ({
  userId,
  modelId,
}: RecentSearchRequestDto): Promise<void> => {
  const recentSearchCar = await prisma.users_Searches_Cars.findFirst({
    where: {
      user_id: userId,
      model_id: modelId,
    },
    select: {
      id: true,
    },
  });

  if (recentSearchCar) {
    await prisma.users_Searches_Cars.update({
      where: {
        id: recentSearchCar.id,
      },
      data: {
        created_at: new Date(),
      },
    });
    return;
  }

  await prisma.users_Searches_Cars.create({
    data: {
      user_id: userId,
      model_id: modelId,
    },
    select: {
      id: true,
    },
  });
};

export { getRecentSearchCars, addCarToRecentSearch };
