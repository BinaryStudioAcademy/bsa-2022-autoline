import { prisma } from '@data/prisma-client';
import { formatDataForResponse } from '@helpers/helpers';

import type {
  setViewedCarRequest,
  setViewedCarResponse,
} from '@autoline/shared';
import type { GetViewedCarsListResponse, viewedCar } from '@common/types/types';

const getViewedCarsList = async (
  userId: string,
  skip: number,
  take: number,
): Promise<GetViewedCarsListResponse> => {
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
          id: model_id as string,
        },
        select: {
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
              id: complectation_id as string,
            },
            select: {
              name: true,
            },
          },
          prices_ranges: {
            where: {
              OR: [
                {
                  model_id: model_id as string,
                },
                {
                  complectation_id: complectation_id as string,
                },
              ],
            },
            select: {
              price_start: true,
              price_end: true,
            },
          },
        },
      });

      const result = formatDataForResponse(viewedCar as viewedCar);

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
}: setViewedCarRequest): Promise<setViewedCarResponse> => {
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
  }

  const { id: viewedListId } = await prisma.users_Viewed_Cars.create({
    data: {
      user_id: userId,
      model_id: modelId,
      complectation_id: complectationId,
    },
    select: {
      id: true,
    },
  });

  return {
    viewedListId,
    modelId,
    complectationId,
  };
};

export { getViewedCarsList, addCarToViewed };
