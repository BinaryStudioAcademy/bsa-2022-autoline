import { CarsSearchParams } from '@autoline/shared';
import { AutoriaRequestParams } from '@common/types/cars/autoria_request_params';
import { prisma } from '@data/prisma-client';

const carsSearch = async (
  data: CarsSearchParams,
): Promise<AutoriaRequestParams[]> => {
  return await prisma.model.findMany({
    where: {
      id: data.model,
      brand: {
        id: data.brand,
      },
    },
    include: {
      brand: true,
    },
  });
};

export { carsSearch };
