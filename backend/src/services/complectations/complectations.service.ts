import { prisma } from '@data/prisma-client';

import type {
  ModelComplectationsResponseDto,
  ComplectationsResponseDto,
  OptionType,
} from '@autoline/shared/common/types/types';

const getComplectationsByModelId = async (
  modelId: string | undefined,
): Promise<ComplectationsResponseDto> => {
  const data = (await prisma.model.findUnique({
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
  })) as ModelComplectationsResponseDto;

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

  optionType.forEach((optionName) => {
    const optionsList: Set<string> = new Set();
    const importantOptionsList: Set<string> = new Set();
    data?.complectations.forEach((complectattion) =>
      complectattion.options.forEach((option) => {
        if (option.option.type === optionName) {
          optionsList.add(option.option.name);
        }
        if (option.important === false) {
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

  data?.complectations.forEach((complectattion) => {
    enginePowers.add(complectattion.engine_power);
    engineDisplacements.add(complectattion.engine_displacement);
    drivetrains.add(complectattion.drivetrain.name);
    fuelTypes.add(complectattion.fuel_type.name);
    transmissionTypes.add(complectattion.transmission_type.name);
    colors.add(complectattion.color.name);
  });

  const result = {
    model: data,
    options: options,
    enginePowers: Array.from(enginePowers),
    colors: Array.from(colors),
    engineDisplacements: Array.from(engineDisplacements),
    drivetrains: Array.from(drivetrains),
    fuelTypes: Array.from(fuelTypes),
    transmissionTypes: Array.from(transmissionTypes),
  };
  return result;
};

export { getComplectationsByModelId };
