import { prisma } from '@data/prisma-client';

import type {
  setViewedCarRequest,
  setViewedCarResponse,
} from '@autoline/shared';
import type { getViewedCarsListResponse } from '@common/types/types';

const getList = async (
  userId: string,
): Promise<(getViewedCarsListResponse | null | undefined)[]> => {
  const viewedСarsList = await prisma.users_Viewed_Cars.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    select: {
      model_id: true,
      complectation_id: true,
    },
  });

  const detailedListOfReviewedCars = await Promise.all(
    viewedСarsList.map(async ({ model_id, complectation_id }) => {
      return prisma.model.findFirst({
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
        },
      });
    }),
  );

  return detailedListOfReviewedCars;
};

const setCar = async ({
  userId,
  modelId,
  complectationId,
}: setViewedCarRequest): Promise<setViewedCarResponse> => {
  const reviewedCarList = await prisma.users_Viewed_Cars.findFirst({
    where: {
      user_id: userId,
      model_id: modelId,
      complectation_id: complectationId,
    },
  });

  if (reviewedCarList) {
    throw new Error('Viewed list of cars already exists');
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

export { getList, setCar };
