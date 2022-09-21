import {
  ComparisonGeneralInform,
  OptionType,
} from '@autoline/shared/common/types/types';
import { prisma } from '@data/prisma-client';
import {
  Comparison,
  ComparisonType,
  Complectation,
  Prisma,
  Type,
} from '@prisma/client';

export interface ComparisonInfo {
  position: number;
  wishlistId: string | undefined;
  id: string;
  brandName: string;
  complectationName: string;
  modelId: string;
  priceStart: number;
  priceEnd: number;
  modelName: string;
  photos: Prisma.JsonValue;
}
const addCarToComparison = async ({
  complectationId,
  lastPosition,
  userId,
}: {
  complectationId: string;
  lastPosition?: number;
  userId: string;
}): Promise<Comparison> => {
  const activeComparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
  });

  if (activeComparison) {
    const presenceCheck = await prisma.comparisons_Complectations.findFirst({
      where: {
        complectation_id: complectationId,
        comparison_id: activeComparison.id,
      },
    });

    if (presenceCheck) {
      throw new Error('Car is already in your active comparison');
    }

    const comparison = await prisma.comparison.update({
      where: { id: activeComparison.id },
      data: { updated_at: new Date() },
    });

    const carsInComparisonAmount =
      await prisma.comparisons_Complectations.count({
        where: { comparison_id: comparison.id },
      });

    await prisma.comparisons_Complectations.create({
      data: {
        comparison_id: comparison.id,
        complectation_id: complectationId,
        position: carsInComparisonAmount + 1,
      },
    });

    const complectationsInComparison =
      await prisma.comparisons_Complectations.findMany({
        where: {
          comparison_id: comparison.id,
          complectation_id: {
            not: complectationId,
          },
        },
        orderBy: {
          position: 'asc',
        },
        select: {
          complectation_id: true,
        },
      });

    const complectationsIds = complectationsInComparison.map(
      (i) => i.complectation_id,
    );

    const position = lastPosition ? lastPosition - 1 : 0;

    complectationsIds.splice(position, 0, complectationId);
    await updatePositions(userId, complectationsIds);

    return comparison;
  }

  const comparison = await prisma.comparison.create({
    data: {
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: userId,
    },
  });

  await prisma.comparisons_Complectations.create({
    data: {
      comparison_id: comparison.id,
      complectation_id: complectationId,
      position: 1,
    },
  });
  return comparison;
};

const changeComparisonType = async ({
  type,
  userId,
}: {
  type: ComparisonType;
  userId: string;
}): Promise<Comparison> => {
  const activeComparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });
  if (!activeComparison) {
    throw new Error('There is no active comparison');
  }
  return prisma.comparison.update({
    where: { id: activeComparison.id },
    data: { type },
  });
};

const clearComparison = async (userId: string): Promise<Comparison> => {
  const activeComparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });
  if (!activeComparison) {
    throw new Error('There is no active comparison');
  }
  return prisma.comparison.update({
    where: { id: activeComparison.id },
    data: { active: false },
  });
};

const deleteCarFromComparison = async ({
  complectationId,
  userId,
}: {
  complectationId: string;
  userId: string;
}): Promise<void> => {
  const activeComparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });

  if (!activeComparison) {
    throw new Error('There is no active comparison');
  }
  await prisma.comparisons_Complectations.delete({
    where: {
      comparison_id_complectation_id: {
        comparison_id: activeComparison.id,
        complectation_id: complectationId,
      },
    },
  });

  const complectationsAmount = await prisma.comparisons_Complectations.count({
    where: { comparison_id: activeComparison.id },
  });

  if (!complectationsAmount) {
    await prisma.comparison.delete({
      where: { id: activeComparison.id },
    });
  }
};

const getActiveComparisonCars = async (
  userId: string,
): Promise<(Complectation | null)[]> => {
  const activeComparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });
  if (!activeComparison) {
    return [];
  }

  const complectations = await prisma.comparisons_Complectations.findMany({
    where: { comparison_id: activeComparison.id },
    select: { complectation_id: true },
  });

  return prisma.complectation.findMany({
    where: {
      id: { in: Array.from(complectations, (c) => c.complectation_id) },
    },
  });
};

const getActiveComparisonStatus = async (userId: string): Promise<string[]> => {
  const comparisons = await prisma.comparisons_Complectations.findMany({
    select: {
      complectation_id: true,
    },
    where: {
      comparison: {
        user_id: userId,
        active: true,
      },
    },
  });
  return comparisons.map((c) => c.complectation_id);
};

const getComparisonGeneralInfo = async (
  userId: string,
): Promise<ComparisonGeneralInform[]> => {
  const activeComparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      comparisons_complectations: {
        orderBy: {
          position: 'asc',
        },
        select: {
          complectation: {
            select: {
              id: true,
              color: { select: { name: true } },
              engine: true,
              engine_displacement: true,
              engine_power: true,
              drivetrain: { select: { name: true } },
              fuel_type: { select: { name: true } },
              transmission_type: { select: { name: true } },
              model: {
                select: {
                  body_type: true,
                },
              },
              options: {
                select: {
                  option: { select: { name: true, type: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!activeComparison) {
    return [];
  }

  const options: OptionType = {
    security: [],
    optics: [],
    multimedia: [],
    upholstery: [],
    sound: [],
    design: [],
    comfort: [],
    auxiliary: [],
  };

  const comparisonsGeneralInfo =
    activeComparison.comparisons_complectations.map((comparison) => {
      const optionsList = comparison.complectation.options.reduce(
        (options: OptionType, obj) => {
          const key = obj.option['type'];
          options[key] ??= [];
          options[key].push(obj.option.name);
          return options;
        },
        {},
      );

      return {
        id: comparison?.complectation.id,
        bodyType: comparison?.complectation.model.body_type.name,
        engine: comparison?.complectation.engine,
        enginePower: comparison?.complectation.engine_power,
        engineDisplacement:
          comparison?.complectation.engine_displacement.toNumber(),
        colorName: comparison?.complectation.color.name,
        transmissionTypeName: comparison?.complectation.transmission_type.name,
        drivetrainName: comparison?.complectation.drivetrain.name,
        fuelTypeName: comparison?.complectation.fuel_type.name,
        options: { ...options, ...optionsList },
      } as ComparisonGeneralInform;
    });

  return comparisonsGeneralInfo;
};

const getComparisonOptions = async (optionType: Type): Promise<string[]> => {
  const options = await prisma.option.findMany({
    where: {
      type: optionType,
    },
    select: {
      name: true,
    },
  });
  return options.map((o) => o.name);
};

const getActiveComparison = async (
  userId: string,
): Promise<ComparisonInfo[] | null> => {
  const activeComparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      comparisons_complectations: {
        orderBy: {
          position: 'asc',
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
                  id: true,
                  name: true,
                  photo_urls: true,
                  brand: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              users_wishlists: {
                where: {
                  user_id: userId,
                },
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!activeComparison) {
    return [];
  }
  const comparisonInfo = activeComparison.comparisons_complectations.map(
    (compl) => ({
      id: compl.complectation.id,
      complectationName: compl.complectation.name,
      position: compl.position,
      brandName: compl.complectation.model.brand.name,
      modelName: compl.complectation.model.name,
      modelId: compl.complectation.model.id,
      photos: compl.complectation.model.photo_urls,
      priceStart: compl.complectation.prices_ranges[0].price_start,
      priceEnd: compl.complectation.prices_ranges[0].price_end,
      wishlistId: compl.complectation.users_wishlists[0]?.id,
    }),
  );

  return comparisonInfo;
};

const updatePositions = async (
  userId: string,
  positions: string[],
): Promise<void> => {
  const activeComparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });
  if (!activeComparison) {
    throw new Error('There is no active comparison');
  }
  await Promise.all(
    positions.map(async (complectationId, index) => {
      await prisma.comparisons_Complectations.update({
        where: {
          comparison_id_complectation_id: {
            comparison_id: activeComparison.id,
            complectation_id: complectationId,
          },
        },
        data: { position: index + 1 },
      });
    }),
  );
};

export {
  addCarToComparison,
  changeComparisonType,
  clearComparison,
  deleteCarFromComparison,
  getActiveComparisonCars,
  getActiveComparisonStatus,
  getComparisonGeneralInfo,
  getComparisonOptions,
  getActiveComparison,
  updatePositions,
};
