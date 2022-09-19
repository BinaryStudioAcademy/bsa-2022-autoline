import { TopCar } from '@autoline/shared';
import { prisma } from '@data/prisma-client';

const getTopAutolineCarsList = async (): Promise<TopCar[]> => {
  const autoriaCodes = await prisma.users_Autoria_Viewed_Cars.groupBy({
    by: ['autoria_code'],
    _count: {
      autoria_code: true,
    },
    orderBy: {
      _count: {
        autoria_code: 'desc',
      },
    },
  });

  const detailedListOfCars = await prisma.autoria_Cars_Details.findMany({
    where: {
      autoria_code: {
        in: autoriaCodes.map((item) => item.autoria_code),
      },
    },
    select: {
      id: true,
      autoria_code: true,
      race: true,
      price: true,
      photo_url: true,
      autoria_url: true,
      model: {
        select: {
          name: true,
          brand: {
            select: {
              name: true,
              logo_url: true,
            },
          },
        },
      },
      city: {
        select: {
          name: true,
        },
      },
      transmission_type: {
        select: {
          name: true,
        },
      },
      fuel_type: {
        select: {
          name: true,
        },
      },
    },
  });

  const formattedListOfCars = detailedListOfCars.map((car) => {
    return {
      id: car.id,
      name: car?.model.name,
      brand: {
        name: car?.model.brand.name,
        logoUrl: car?.model.brand.logo_url,
      },
      url: car?.autoria_url,
      photoUrl: car?.photo_url,
      location: car?.city?.name,
      transmission: car?.transmission_type?.name,
      fuelType: car?.fuel_type?.name,
      price: car?.price,
      race: car?.race,
    } as TopCar;
  });

  return formattedListOfCars;
};

export { getTopAutolineCarsList };
