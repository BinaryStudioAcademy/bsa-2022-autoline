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
} from '@prisma/client';

export interface ComplPreviewInfo {
  position: number;
  id: string;
  complectationName: string;
  modelId: string;
  priceStart: number;
  priceEnd: number;
  modelName: string;
  photos: Prisma.JsonValue;
}

const addCarToComparison = async ({
  complectationId,
  userId,
}: {
  complectationId: string;
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

  const comparisons = await prisma.complectation.findMany({
    where: {
      id: { in: Array.from(complectations, (c) => c.complectation_id) },
    },
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
  });

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

  const comparisonsGeneralInfo = comparisons.map((comparison) => {
    const optionsList = comparison.options.reduce(
      (options: OptionType, obj) => {
        const key = obj.option['type'];
        options[key] ??= [];
        options[key].push(obj.option.name);
        return options;
      },
      {},
    );

    return {
      id: comparison?.id,
      bodyType: comparison?.model.body_type.name,
      engine: comparison?.engine,
      enginePower: comparison?.engine_power,
      engineDisplacement: comparison?.engine_displacement.toNumber(),
      colorName: comparison?.color.name,
      transmissionTypeName: comparison?.transmission_type.name,
      drivetrainName: comparison?.drivetrain.name,
      fuelTypeName: comparison?.fuel_type.name,
      options: { ...options, ...optionsList },
    } as ComparisonGeneralInform;
  });

  return comparisonsGeneralInfo;
};

const getActiveComparisonCarsPreview = async (
  userId: string,
): Promise<ComplPreviewInfo[]> => {
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
    select: {
      complectation_id: true,
      position: true,
      complectation: {
        select: {
          name: true,
          model_id: true,
        },
      },
    },
  });

  const priceRanges = await prisma.prices_Range.findMany({
    where: {
      complectation_id: {
        in: Array.from(complectations, (c) => c.complectation_id),
      },
    },
    select: {
      complectation_id: true,
      price_start: true,
      price_end: true,
    },
  });

  const modelsInfo = await prisma.model.findMany({
    where: {
      id: { in: Array.from(complectations, (c) => c.complectation.model_id) },
    },
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
  });

  const complectationsInfo = await prisma.complectation.findMany({
    where: {
      id: { in: Array.from(complectations, (c) => c.complectation_id) },
    },
    select: {
      id: true,
      name: true,
      users_wishlists: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });

  const complPreviewInfo = complectations.map((compl) => {
    const modelIndex = modelsInfo.findIndex(
      (model) => model.id === compl.complectation.model_id,
    );
    const complIndex = complectationsInfo.findIndex(
      (complInfo) => complInfo.id === compl.complectation_id,
    );
    const priceIndex = priceRanges.findIndex(
      (prices) => prices.complectation_id === compl.complectation_id,
    );
    return {
      id: compl.complectation_id,
      complectationName: compl.complectation.name,
      position: compl.position,
      brandName: modelsInfo[modelIndex].brand.name,
      modelName: modelsInfo[modelIndex].name,
      modelId: modelsInfo[modelIndex].id,
      photos: modelsInfo[modelIndex].photo_urls,
      priceStart: priceRanges[priceIndex].price_start,
      priceEnd: priceRanges[priceIndex].price_end,
      wishlistId: complectationsInfo[complIndex].users_wishlists[0]?.id,
    };
  });

  return complPreviewInfo;
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
  });
};

export {
  addCarToComparison,
  changeComparisonType,
  clearComparison,
  deleteCarFromComparison,
  getActiveComparisonCars,
  getActiveComparisonStatus,
  getComparisonGeneralInfo,
  getActiveComparisonCarsPreview,
  updatePositions,
};
