import { prisma } from '@data/prisma-client';
import { formatComplectationDtoResponse } from '@helpers/helpers';

import type {
  ModelReturnedData,
  ComplectationReturnedData,
  OptionType,
  ComplectationsInput,
  ComplectationShortInfoDto,
  ComlectationShortInfoResponse,
} from '@autoline/shared/common/types/types';

const getComplectationsById = async (
  input: ComplectationsInput,
): Promise<ModelReturnedData | ComplectationReturnedData> => {
  const { modelId, complectationId } = input;
  const data = await prisma.complectation.findUnique({
    where: {
      id: complectationId,
    },
    select: {
      name: true,
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
      prices_ranges: {
        select: {
          price_start: true,
          price_end: true,
        },
      },
      color: { select: { name: true } },
      engine_displacement: true,
      engine_power: true,
      drivetrain: { select: { name: true } },
      fuel_type: { select: { name: true } },
      transmission_type: { select: { name: true } },
      options: {
        select: {
          option: { select: { name: true, type: true } },
          important: true,
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
    important: [],
  };

  const importantOptionsList: Set<string> = new Set();
  data?.options.forEach((option) => {
    if (option.important === true) {
      importantOptionsList.add(option.option.name);
    }
  }),
    (options.important = Array.from(importantOptionsList));

  const optionsList = data?.options.reduce((options: OptionType, obj) => {
    const key = obj.option['type'];
    options[key] ??= [];
    options[key].push(obj.option.name);
    return options;
  }, {});

  const complectationMaxPrices = data?.prices_ranges.map(
    (price: { price_start: number; price_end: number }) => price.price_end,
  );
  const complectationMinPrices = data?.prices_ranges.map(
    (price: { price_start: number; price_end: number }) => price.price_start,
  );

  const complectationData = {
    model: data?.model.name,
    brand: data?.model.brand.name,
    name: data?.name,
    enginePowers: [data?.engine_power],
    colors: [data?.color.name],
    engineDisplacements: [data?.engine_displacement.toNumber()],
    drivetrains: [data?.drivetrain.name],
    fuelTypes: [data?.fuel_type.name],
    transmissionTypes: [data?.transmission_type.name],
    options: { ...options, ...optionsList },
    maxPrice:
      complectationMaxPrices !== undefined
        ? Math.max(...complectationMaxPrices)
        : 0,
    minPrice:
      complectationMinPrices !== undefined
        ? Math.max(...complectationMinPrices)
        : 0,
  } as ComplectationReturnedData;

  const model = await prisma.model.findUnique({
    where: {
      id: modelId,
    },
    select: {
      prices_ranges: {
        select: {
          price_start: true,
          price_end: true,
        },
      },
      complectations: {
        select: {
          color: { select: { name: true } },
          engine_displacement: true,
          engine_power: true,
          drivetrain: { select: { name: true } },
          fuel_type: { select: { name: true } },
          transmission_type: { select: { name: true } },
          options: {
            select: {
              option: { select: { name: true, type: true } },
              important: true,
            },
          },
        },
      },
    },
  });

  const optionType = [
    'security',
    'optics',
    'multimedia',
    'upholstery',
    'sound',
    'design',
    'comfort',
    'auxiliary',
  ];

  optionType.forEach((optionName) => {
    const optionsList: Set<string> = new Set();
    const importantOptionsList: Set<string> = new Set();
    model?.complectations.forEach((complectattion) =>
      complectattion.options.forEach((option) => {
        if (option.option.type === optionName) {
          optionsList.add(option.option.name);
        }
        if (option.important === true) {
          importantOptionsList.add(option.option.name);
        }
      }),
    );
    options.important = [...importantOptionsList];
    switch (optionName) {
      case 'security':
        options.security = [...optionsList];
        break;
      case 'optics':
        options.optics = [...optionsList];
        break;
      case 'multimedia':
        options.multimedia = [...optionsList];
        break;
      case 'upholstery':
        options.upholstery = [...optionsList];
        break;
      case 'sound':
        options.sound = [...optionsList];
        break;
      case 'design':
        options.design = [...optionsList];
        break;
      case 'comfort':
        options.comfort = [...optionsList];
        break;
      case 'auxiliary':
        options.auxiliary = [...optionsList];
        break;
      default:
        break;
    }
  });

  const enginePowers: Set<number> = new Set();
  const colors: Set<string> = new Set();
  const engineDisplacements: Set<number> = new Set();
  const drivetrains: Set<string> = new Set();
  const fuelTypes: Set<string> = new Set();
  const transmissionTypes: Set<string> = new Set();

  model?.complectations.forEach((complectattion) => {
    enginePowers.add(complectattion.engine_power);
    engineDisplacements.add(complectattion.engine_displacement.toNumber());
    drivetrains.add(complectattion.drivetrain.name);
    fuelTypes.add(complectattion.fuel_type.name);
    transmissionTypes.add(complectattion.transmission_type.name);
    colors.add(complectattion.color.name);
  });

  const modelMaxPrices = model?.prices_ranges.map(
    (price: { price_start: number; price_end: number }) => price.price_end,
  );
  const modelMinPrices = model?.prices_ranges.map(
    (price: { price_start: number; price_end: number }) => price.price_start,
  );
  const modelData = {
    enginePowers: [...enginePowers],
    colors: [...colors],
    engineDisplacements: [...engineDisplacements],
    drivetrains: [...drivetrains],
    fuelTypes: [...fuelTypes],
    transmissionTypes: [...transmissionTypes],
    options: options,
    maxPrice: modelMaxPrices !== undefined ? Math.max(...modelMaxPrices) : 0,
    minPrice: modelMinPrices !== undefined ? Math.min(...modelMinPrices) : 0,
  } as ModelReturnedData;
  const result = modelId === '' ? complectationData : modelData;
  return result;
};

const getComplectationShortInfoById = async ({
  complectationId,
}: {
  complectationId: string;
}): Promise<ComlectationShortInfoResponse> => {
  const data = await prisma.complectation.findFirst({
    where: {
      id: complectationId,
    },
    select: {
      id: true,
      name: true,
      model: {
        select: {
          name: true,
          photo_urls: true,
          brand: {
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
        },
      },
    },
  });

  const response = formatComplectationDtoResponse(
    data as ComplectationShortInfoDto,
  );

  return response;
};

export { getComplectationsById, getComplectationShortInfoById };
