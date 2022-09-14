import { prisma } from '@data/prisma-client';
import { formatAllComparisonsResponse } from '@helpers/helpers';

import type {
  GetAllComparisonsRequestDto,
  GetAllComparisonsResponse,
  ChangeActiveComparisonRequestDto,
} from '@autoline/shared';

const getAllComparisons = async ({
  userId,
}: GetAllComparisonsRequestDto): Promise<GetAllComparisonsResponse> => {
  const allComparisonsList = await prisma.comparison.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    select: {
      id: true,
    },
  });

  const countComparisons = await prisma.comparison.count({
    where: {
      user_id: userId,
    },
  });

  const allComparisonsDetail = await Promise.all(
    allComparisonsList.map(async ({ id }) => {
      const data = await prisma.comparisons_Complectations.findMany({
        orderBy: {
          position: 'asc',
        },
        where: {
          comparison_id: id,
        },
        select: {
          position: true,
          complectation: {
            select: {
              id: true,
              name: true,
              prices_ranges: {
                select: {
                  price_start: true,
                  price_end: true,
                },
              },
              model: {
                select: {
                  name: true,
                  photo_urls: true,
                  year_start: true,
                  year_end: true,
                  brand: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const formatData = formatAllComparisonsResponse(data);

      return { id, list: formatData };
    }),
  );

  return { comparisons: allComparisonsDetail, count: countComparisons };
};

const changeActiveComparison = async ({
  userId,
  comparisonId,
}: ChangeActiveComparisonRequestDto): Promise<void> => {
  await prisma.comparison.updateMany({
    where: {
      user_id: userId,
      active: true,
    },
    data: {
      active: false,
    },
  });

  await prisma.comparison.update({
    where: {
      id: comparisonId,
    },
    data: {
      active: true,
    },
  });
};

export { getAllComparisons, changeActiveComparison };
