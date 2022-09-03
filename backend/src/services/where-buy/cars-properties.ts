import { prisma } from '@data/prisma-client';

interface PropertiesProp {
  color: {
    autoria_code: number;
  };
  drivetrain: {
    autoria_code: number;
  };
  fuel_type: {
    autoria_code: number;
  };
  transmission_type: {
    autoria_code: number;
  };
}

const carProperties = async (id: string): Promise<PropertiesProp | null> => {
  console.log('properties');
  const properties = await prisma.complectation.findFirst({
    where: {
      id,
    },
    select: {
      color: {
        select: {
          autoria_code: true,
        },
      },
      drivetrain: {
        select: {
          autoria_code: true,
        },
      },
      fuel_type: {
        select: {
          autoria_code: true,
        },
      },
      transmission_type: {
        select: {
          autoria_code: true,
        },
      },
    },
  });

  return properties;
};

export { carProperties };
