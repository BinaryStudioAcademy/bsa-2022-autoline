import { ModelDetailsType, ComplectationDetailsType } from '@autoline/shared';
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
  const regions = await prisma.region.findMany({
    orderBy: { autoria_code: 'asc' },
  });

  const bodyTypes = await prisma.body_Type.findMany({
    orderBy: { autoria_code: 'asc' },
  });

  const colors = await prisma.color.findMany({
    orderBy: { autoria_code: 'asc' },
  });

  const drivetrains = await prisma.drivetrain.findMany({
    orderBy: { autoria_code: 'asc' },
  });

  const fuelTypes = await prisma.fuel_Type.findMany({
    orderBy: { autoria_code: 'asc' },
  });

  const transmissionTypes = await prisma.transmission_Type.findMany({
    orderBy: { autoria_code: 'asc' },
  });

  return {
    regions,
    bodyTypes,
    colors,
    drivetrains,
    fuelTypes,
    transmissionTypes,
  };
};

const getModelDetails = async (modelId: string): Promise<ModelDetailsType> => {
  const model = await prisma.model.findFirst({
    where: { id: modelId },
    select: {
      id: true,
      name: true,
      description: true,
      photo_urls: true,
      year_start: true,
      year_end: true,
      brand: {
        select: {
          name: true,
        },
      },
      body_type: {
        select: {
          name: true,
        },
      },
      prices_ranges: {
        select: {
          price_start: true,
          price_end: true,
        },
      },
      complectations: {
        select: {
          id: true,
        },
      },
    },
  });

  return {
    id: model?.id,
    modelName: model?.name,
    description: model?.description,
    photoUrls: model?.photo_urls,
    brandName: model?.brand.name,
    priceStart: model?.prices_ranges[0].price_start,
    priceEnd: model?.prices_ranges[0].price_end,
    complectationsId: model?.complectations.map((i) => i.id),
  } as ModelDetailsType;
};

const getComplectationsDetails = async (
  complectationIds: string[],
): Promise<ComplectationDetailsType[]> => {
  const complectations = await prisma.complectation.findMany({
    where: {
      id: {
        in: complectationIds,
      },
    },
    select: {
      id: true,
      name: true,
      engine: true,
      engine_displacement: true,
      engine_power: true,
      color: {
        select: {
          name: true,
        },
      },
      transmission_type: {
        select: {
          name: true,
        },
      },
      drivetrain: {
        select: {
          name: true,
        },
      },
      fuel_type: {
        select: {
          name: true,
        },
      },
      prices_ranges: {
        select: {
          price_start: true,
          price_end: true,
        },
      },
      _count: {
        select: {
          options: true,
        },
      },
      options: {
        select: {
          option: {
            select: {
              name: true,
            },
          },
        },
        where: {
          important: true,
        },
      },
      model: {
        select: {
          name: true,
          brand: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return complectations.map((complectation) => ({
    id: complectation.id,
    name: complectation.name,
    model: complectation.model.name,
    brand: complectation.model.brand.name,
    engine: complectation.engine,
    engineDisplacement: complectation.engine_displacement.toNumber(),
    enginePower: complectation.engine_power,
    colorName: complectation.color.name,
    transmissionTypeName: complectation.transmission_type.name,
    drivetrainName: complectation.drivetrain.name,
    fuelTypeName: complectation.fuel_type.name,
    priceStart: complectation.prices_ranges[0].price_start,
    priceEnd: complectation.prices_ranges[0].price_end,
    optionsCount: complectation._count.options,
    options: complectation.options.map((option) => ({
      name: option.option.name,
    })),
  }));
};

export {
  getBrands,
  getModels,
  getUsedOptions,
  getModelDetails,
  getComplectationsDetails,
};
