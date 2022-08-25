import { prisma } from '@data/prisma-client';

import type {
  ModelComplectationsResponseDto,
  ComplectationsResponseDto,
  OptionType,
} from '@autoline/shared/common/types/types';

const getComplectationsById = async (
  complectationId: string | undefined,
): Promise<ComplectationsResponseDto> => {
  const data = (await prisma.complectation.findUnique({
    where: {
      id: complectationId,
    },
    select: {
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
    data?.options.forEach((option) => {
      if (option.option.type === optionName) {
        options[optionName].push(option.option.name);
      }
    });
  });

  const importantOptionsList: Set<string> = new Set();
  data?.options.forEach((option) => {
    if (option.important === false) {
      importantOptionsList.add(option.option.name);
    }
  }),
    (options.important = Array.from(importantOptionsList));

  const result = {
    complectation: data,
    options: options,
    price: `${data?.prices_ranges[0].price_start} - ${data?.prices_ranges[0].price_end}`,
  };
  return result;
};

export { getComplectationsById };
