import { prisma } from '@data/prisma-client';

import type {
  ModelReturnedData,
  ComplectationReturnedData,
  OptionType,
  ComplectationsInput,
  ModelReturnedDbType,
  ComplectationReturnedDbType,
} from '@autoline/shared/common/types/types';

const getComplectationsById = async (
  input: ComplectationsInput,
): Promise<ModelReturnedData | ComplectationReturnedData> => {
  const { userId, modelId, complectationId } = input;
  const data = (await prisma.complectation.findUnique({
    where: {
      id: complectationId,
    },
    select: {
      users_wishlists: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
          complectation: {
            select: {
              id: true,
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
  })) as ComplectationReturnedDbType;

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

  const optionsList = data?.options.reduce((acc: OptionType, obj) => {
    const key = obj.option['type'];
    acc[key] ??= [];
    acc[key].push(obj.option.name);
    return acc;
  }, {});

  const complectationData: ComplectationReturnedData = {
    data: data,
    enginePowers: [data?.engine_power],
    colors: [data?.color.name],
    engineDisplacements: [data?.engine_displacement],
    drivetrains: [data?.drivetrain.name],
    fuelTypes: [data?.fuel_type.name],
    transmissionTypes: [data?.transmission_type.name],
    options: { ...options, ...optionsList },
    priceStart: data?.prices_ranges[0].price_start,
    priceEnd: data?.prices_ranges[0].price_end,
  };

  const model = (await prisma.model.findUnique({
    where: {
      id: modelId,
    },
    select: {
      users_wishlists: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
          model: {
            select: {
              id: true,
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
  })) as ModelReturnedDbType;

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
    options.important = Array.from(importantOptionsList);
    switch (optionName) {
      case 'security':
        options.security = Array.from(optionsList);
        break;
      case 'optics':
        options.optics = Array.from(optionsList);
        break;
      case 'multimedia':
        options.multimedia = Array.from(optionsList);
        break;
      case 'upholstery':
        options.upholstery = Array.from(optionsList);
        break;
      case 'sound':
        options.sound = Array.from(optionsList);
        break;
      case 'design':
        options.design = Array.from(optionsList);
        break;
      case 'comfort':
        options.comfort = Array.from(optionsList);
        break;
      case 'auxiliary':
        options.auxiliary = Array.from(optionsList);
        break;
      default:
        break;
    }
  });

  const enginePowers: Set<number> = new Set();
  const colors: Set<string> = new Set();
  const engineDisplacements: Set<string> = new Set();
  const drivetrains: Set<string> = new Set();
  const fuelTypes: Set<string> = new Set();
  const transmissionTypes: Set<string> = new Set();

  model?.complectations.forEach((complectattion) => {
    enginePowers.add(complectattion.engine_power);
    engineDisplacements.add(complectattion.engine_displacement);
    drivetrains.add(complectattion.drivetrain.name);
    fuelTypes.add(complectattion.fuel_type.name);
    transmissionTypes.add(complectattion.transmission_type.name);
    colors.add(complectattion.color.name);
  });

  const modelData: ModelReturnedData = {
    data: model,
    enginePowers: Array.from(enginePowers),
    colors: Array.from(colors),
    engineDisplacements: Array.from(engineDisplacements),
    drivetrains: Array.from(drivetrains),
    fuelTypes: Array.from(fuelTypes),
    transmissionTypes: Array.from(transmissionTypes),
    options: options,
    priceStart: model?.prices_ranges[0].price_start,
    priceEnd: model?.prices_ranges[0].price_end,
  };
  const result = modelId === '' ? complectationData : modelData;
  return result;
};

export { getComplectationsById };
