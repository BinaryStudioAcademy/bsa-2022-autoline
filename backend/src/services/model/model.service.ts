import { prisma } from '@data/prisma-client';

import type {} from '@autoline/shared/common/types/types';
import type {} from '@common/types/types';

type datatype = {
  comfort: Array<string>;
  complectations: {
    comfort: Array<string>;
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

const getModel = async (modelId: string | undefined): Promise<datatype> => {
  const data = (await prisma.model.findFirst({
    where: {
      id: modelId,
    },
    select: {
      id: true,
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

  const comfort: Set<string> = new Set();
  data?.complectations.forEach((complectattion) =>
    complectattion.options.forEach((option) => {
      if (option.option.type === 'comfort') {
        comfort.add(option.option.name);
      }
    }),
  );
  //data?.complectations.map((e) => (e.comfort = Array.from(comfort)));
  data?.comfort = Array.from(comfort);
  return data;
};

export { getModel };
