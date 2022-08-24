import { getNewCar } from '@services/new-cars/new-cars.service';

import type { ModelResponseDto } from '@autoline/shared/common/types/types';

const newerCars = async (quantity: number): Promise<ModelResponseDto[]> => {
  const arr = new Array(quantity).fill('');
  const newCars = await Promise.all(
    arr.map(async (val, indx) => await getNewCar(-1, indx)),
  );

  return newCars;
};

export { newerCars };
