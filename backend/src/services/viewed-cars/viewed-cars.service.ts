import { prisma } from '@data/prisma-client';
import { formatDtoForResponse } from '@helpers/helpers';

import type {
  SetViewedCarRequestDto,
  GetViewedCarsRequestDto,
  GetViewedCarsResponse,
  ViewedCarPrismaDto,
} from '@autoline/shared';

const getViewedCarsList = async ({
  userId,
  skip,
  take,
}: GetViewedCarsRequestDto<number>): Promise<GetViewedCarsResponse> => {
  const viewedСarsList = await prisma.users_Viewed_Cars.findMany({
    skip,
    take,
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    select: {
      id: true,
      model_id: true,
      complectation_id: true,
    },
  });

  const countViewedCars = await prisma.users_Viewed_Cars.count({
    where: {
      user_id: userId,
    },
  });

  const detailedListOfViewedCars = await Promise.all(
    viewedСarsList.map(async ({ id, model_id, complectation_id }) => {
      const viewedCar = await prisma.model.findFirst({
        where: {
          id: model_id,
        },
        select: {
          id: true,
          name: true,
          year_start: true,
          year_end: true,
          photo_urls: true,
          brand: {
            select: {
              name: true,
            },
          },
          complectations: {
            where: {
              id: complectation_id,
            },
            select: {
              name: true,
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

      const result = formatDtoForResponse(viewedCar as ViewedCarPrismaDto);

      return { id, ...result };
    }),
  );

  return {
    list: detailedListOfViewedCars,
    count: countViewedCars,
  };
};

const addCarToViewed = async ({
  userId,
  modelId,
  complectationId,
}: SetViewedCarRequestDto): Promise<void> => {
  const viewedCar = await prisma.users_Viewed_Cars.findFirst({
    where: {
      user_id: userId,
      model_id: modelId,
      complectation_id: complectationId,
    },
    select: {
      id: true,
    },
  });

  if (viewedCar) {
    await prisma.users_Viewed_Cars.update({
      where: {
        id: viewedCar.id,
      },
      data: {
        created_at: new Date(),
      },
    });
    return;
  }

  await prisma.users_Viewed_Cars.create({
    data: {
      user_id: userId,
      model_id: modelId,
      complectation_id: complectationId,
    },
    select: {
      id: true,
    },
  });
};

export { getViewedCarsList, addCarToViewed };
