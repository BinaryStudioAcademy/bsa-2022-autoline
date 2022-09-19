import { TopCar } from '@autoline/shared';
import { prisma } from '@data/prisma-client';

const getTopAutolineCarsList = async (): Promise<TopCar[]> => {
  const autoriaCodes = await prisma.users_Autoria_Viewed_Cars.groupBy({
    by: ['autoria_code'],
    _count: {
      autoria_code: true,
    },
  });

  const orderData = new Map<number, number>();
  autoriaCodes.forEach((autoriaCode) => {
    orderData.set(autoriaCode.autoria_code, autoriaCode._count.autoria_code);
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

  const formattedListOfCars = detailedListOfCars
    .sort(
      (car1, car2) =>
        (orderData.get(car2.autoria_code) as number) -
        (car1 ? (orderData.get(car1?.autoria_code) as number) : 0),
    )
    .map((car) => {
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
