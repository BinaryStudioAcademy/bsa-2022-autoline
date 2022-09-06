import { prisma } from '@data/prisma-client';
import { Comparison, ComparisonType, Complectation } from '@prisma/client';

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
      where: { complectation_id: complectationId },
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
  const comparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });
  if (!comparison) {
    throw new Error('There is no active comparison');
  }
  return prisma.comparison.update({
    where: { id: comparison.id },
    data: { type },
  });
};

const clearComparison = async (userId: string): Promise<Comparison> => {
  const comparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });
  if (!comparison) {
    throw new Error('There is no active comparison');
  }
  return prisma.comparison.update({
    where: { id: comparison.id },
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
  const comparison = await prisma.comparison.findFirst({
    where: {
      active: true,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });

  if (!comparison) {
    throw new Error('There is no active comparison');
  }
  await prisma.comparisons_Complectations.delete({
    where: {
      comparison_id_complectation_id: {
        comparison_id: comparison.id,
        complectation_id: complectationId,
      },
    },
  });

  const complectationsAmount = await prisma.comparisons_Complectations.count({
    where: { comparison_id: comparison.id },
  });

  if (!complectationsAmount) {
    await prisma.comparison.delete({
      where: { id: comparison.id },
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

export {
  addCarToComparison,
  changeComparisonType,
  clearComparison,
  deleteCarFromComparison,
  getActiveComparisonCars,
  getActiveComparisonStatus,
};
