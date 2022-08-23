import { prisma } from '@data/prisma-client';

import type {} from '@autoline/shared/common/types/types';

type datatype = {
  complectations: {
    engine_displacement: string;
    engine_power: number;
    color: {
      name: string;
    };
    drivetrain: {
      name: string;
    };
    fuel_type: {
      name: string;
    };
    transmission_type: {
      name: string;
    };
    options: {
      option: {
        name: string;
        type: string;
      };
    }[];
  }[];
} | null;

type resultType = {
  complectations: datatype;
  options: Array<object>;
};

const getComplectationsByModelId = async (
  modelId: string | undefined,
): Promise<resultType> => {
  const data = (await prisma.model.findUnique({
    where: {
      id: modelId,
    },
    select: {
      complectations: {
        select: {
          color: { select: { name: true } },
          engine_displacement: true,
          engine_power: true,
          drivetrain: { select: { name: true } },
          fuel_type: { select: { name: true } },
          transmission_type: { select: { name: true } },
          options: {
            select: { option: { select: { name: true, type: true } } },
          },
        },
      },
    },
  })) as datatype;

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

  const options: Array<object> = [];
  optionType.forEach((e) => {
    const optionsList: Set<string> = new Set();
    data?.complectations.forEach((complectattion) =>
      complectattion.options.forEach((option) => {
        if (option.option.type === e) {
          optionsList.add(option.option.name);
        }
      }),
    );
    options.push({ [e]: Array.from(optionsList) });
  });
  const result = {
    complectations: data,
    options: options,
  };
  return result;
};

export { getComplectationsByModelId };
