import { prisma } from '@data/prisma-client';

import type {
  ModelComplectationsResponseDto,
  ComplectationsResponseDto,
  OptionType,
} from '@autoline/shared/common/types/types';

const getComplectationsById = async (
  complectationId: string | undefined,
  userId: string,
): Promise<ComplectationsResponseDto> => {
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
  })) as ModelComplectationsResponseDto;

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
    if (option.important === false) {
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

  const result = {
    complectation: data,
    options: { ...options, ...optionsList },
    price: `${data?.prices_ranges[0].price_start} - ${data?.prices_ranges[0].price_end}`,
  };
  return result;
};

export { getComplectationsById };
