import { prisma } from '@data/prisma-client';

interface TopCar {
  id: string;
  name: string;
  url: string;
  photoUrl: string;
  brand: {
    name: string;
    logoUrl: string;
  };
  price: number;
  race: number;
  transmission: string;
  location: string;
  fuelType: string;
}

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

  const detailedListOfCars = await Promise.all(
    autoriaCodes.map(async ({ autoria_code: autoriaCode }) => {
      const viewedСarsList = await prisma.autoria_Cars_Details.findFirst({
        where: {
          autoria_code: autoriaCode,
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

      return viewedСarsList;
    }),
  );

  const formattedListOfCars = detailedListOfCars.map((car) => {
    return {
      id: car?.id,
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
