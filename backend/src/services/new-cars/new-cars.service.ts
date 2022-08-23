import { prisma } from '@data/prisma-client';
import Prisma from '@prisma/client';

const getfourNewCars = async (): Promise<Prisma.Model[]> => {
  const newcars = await prisma.model.findMany({
    take: -4,
  });

  return newcars;
};

const getRangeCar = async (id: string): Promise<Prisma.Prices_Range | null> => {
  const range = await prisma.prices_Range.findFirst({
    where: {
      model_id: id,
    },
  });

  return range;
};

const getCarBrand = async (id: string): Promise<Prisma.Brand | null> => {
  const brand = await prisma.brand.findFirst({
    where: {
      id: id,
    },
  });
  return brand;
};

export { getfourNewCars, getRangeCar, getCarBrand };
