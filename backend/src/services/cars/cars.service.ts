import { prisma } from '@data/prisma-client';
import {
  Region,
  Body_Type,
  Brand,
  Color,
  Drivetrain,
  Fuel_Type,
  Model,
  Transmission_Type,
  City,
} from '@prisma/client';

type UsedOptionsType = {
  regions: Region[];
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

const getModels = async (brandId: string): Promise<Partial<Model>[]> => {
  return await prisma.model.findMany({
    where: { manufacturer_id: brandId },
    select: {
      id: true,
      name: true,
    },
  });
};

const getUsedOptions = async (): Promise<UsedOptionsType> => {
  const regions = await prisma.region.findMany();

  const bodyTypes = await prisma.body_Type.findMany({});

  const colors = await prisma.color.findMany({});

  const drivetrains = await prisma.drivetrain.findMany({});

  const fuelTypes = await prisma.fuel_Type.findMany({});

  const transmissionTypes = await prisma.transmission_Type.findMany({});

  return {
    regions,
    bodyTypes,
    colors,
    drivetrains,
    fuelTypes,
    transmissionTypes,
  };
};

const getCities = async (regionId: string): Promise<Partial<City>[]> => {
  return await prisma.city.findMany({
    where: { region_id: regionId },
    select: {
      id: true,
      name: true,
    },
  });
};

export { getBrands, getModels, getUsedOptions, getCities };
