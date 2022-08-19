import { prisma } from '@data/prisma-client';
import {
  Body_Type,
  Brand,
  Color,
  Drivetrain,
  Fuel_Type,
  Model,
  Transmission_Type,
} from '@prisma/client';

type UsedOptionsType = {
  bodyTypes: Body_Type[];
  colors: Color[];
  drivetrains: Drivetrain[];
  fuelTypes: Fuel_Type[];
  transmissionTypes: Transmission_Type[];
};

const getBrands = async (): Promise<Brand[]> => {
  return await prisma.brand.findMany({
    where: {
      models: {
        some: {},
      },
    },
  });
};

const getModels = async (brandId: string): Promise<Model[]> => {
  return await prisma.model.findMany({
    where: { manufacturer_id: brandId },
    include: {
      prices_ranges: true,
    },
  });
};

const getUsedOptions = async (): Promise<UsedOptionsType> => {
  const bodyTypes = await prisma.body_Type.findMany({
    where: {
      models: {
        some: {},
      },
    },
  });

  const colors = await prisma.color.findMany({
    where: {
      complectations: {
        some: {},
      },
    },
  });

  const drivetrains = await prisma.drivetrain.findMany({
    where: {
      complectations: {
        some: {},
      },
    },
  });

  const fuelTypes = await prisma.fuel_Type.findMany({
    where: {
      complectations: {
        some: {},
      },
    },
  });

  const transmissionTypes = await prisma.transmission_Type.findMany({
    where: {
      complectations: {
        some: {},
      },
    },
  });

  return {
    bodyTypes,
    colors,
    drivetrains,
    fuelTypes,
    transmissionTypes,
  };
};

export { getBrands, getModels, getUsedOptions };
