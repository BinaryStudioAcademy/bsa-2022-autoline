import { prisma } from '@data/prisma-client';
import { getCarDetailsAutoRia } from '@helpers/cars/api-autoria.helper';

const carsUpdateAutoriaDetailsByCode = async (
  autoriaCode: number,
  model_id: string,
): Promise<string> => {
  const carData = await getCarDetailsAutoRia(String(autoriaCode));
  if (!carData) return '';

  const price = carData.USD;
  const {
    raceInt: race,
    gearBoxId: transmission_type_id,
    fuelId: fuel_type_id,
  } = carData.autoData;
  const { seoLinkF: photo_url } = carData.photoData;
  const autoria_url = `https://auto.ria.com/uk${carData.linkToView}`;
  const cityId = carData.stateData.stateId;

  try {
    await prisma.autoria_Cars_Details.upsert({
      where: {
        autoria_code: autoriaCode,
      },
      update: {
        model: {
          connect: {
            id: model_id,
          },
        },
        price,
        race,
        autoria_url,
        photo_url,
        city: {
          connect: {
            autoria_code: Number(cityId),
          },
        },
        transmission_type: {
          connect: {
            autoria_code: Number(transmission_type_id),
          },
        },
        fuel_type: {
          connect: {
            autoria_code: Number(fuel_type_id),
          },
        },
      },
      create: {
        autoria_code: autoriaCode,
        model: {
          connect: {
            id: model_id,
          },
        },
        price,
        race,
        autoria_url,
        photo_url,
        city: {
          connect: {
            autoria_code: Number(cityId),
          },
        },
        transmission_type: {
          connect: {
            autoria_code: Number(transmission_type_id),
          },
        },
        fuel_type: {
          connect: {
            autoria_code: Number(fuel_type_id),
          },
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return '';
  }

  return String(autoriaCode);
};

const carsUpdateAutoriaDetails = async (): Promise<string[]> => {
  const autoriaViewedCars = await prisma.users_Autoria_Viewed_Cars.findMany({
    distinct: ['autoria_code'],
    select: {
      autoria_code: true,
      model_id: true,
    },
  });

  const updatedAutoriaDetails = await Promise.all(
    autoriaViewedCars.map((autoriaViewedCar) =>
      carsUpdateAutoriaDetailsByCode(
        autoriaViewedCar.autoria_code,
        autoriaViewedCar.model_id,
      ),
    ),
  );

  return updatedAutoriaDetails.filter((code) => code !== '');
};

export { carsUpdateAutoriaDetailsByCode, carsUpdateAutoriaDetails };
