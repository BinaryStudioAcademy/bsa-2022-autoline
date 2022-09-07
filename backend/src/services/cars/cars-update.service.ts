import {
  CarDetailsResponse,
  CarsSearchAutoriaParams,
} from '@common/types/types';
import { prisma } from '@data/prisma-client';
import { getCarDetailsAutoRia } from '@helpers/cars/api-autoria.helper';
import { getCarsAutoRia } from '@helpers/helpers';

import { carsSearchAutoria } from './cars-search.service';

const COUNTPAGE = 100;

const getCarsIdsFromAutoria = async (
  complectationId: string,
): Promise<string[]> => {
  const params: CarsSearchAutoriaParams = {
    complectationId,
    page: '0',
    countpage: COUNTPAGE,
  };

  try {
    const carsData = await carsSearchAutoria(params);
    const autoRiaCarsData = await getCarsAutoRia(carsData);
    const searchResults = autoRiaCarsData.result.search_result;
    let { ids: carsIds } = searchResults;
    const { count } = searchResults;
    const pagesLeft = Math.floor(count / COUNTPAGE);
    for (let page = 1; page <= pagesLeft; page++) {
      carsData.page = String(page);
      const autoRiaCarsData = await getCarsAutoRia(carsData);
      const { ids } = autoRiaCarsData.result.search_result;
      carsIds = carsIds.concat(ids);
    }

    return carsIds;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return [];
};

const getCarDetailsFromAutoria = async (
  ids: string[],
): Promise<CarDetailsResponse[]> =>
  Promise.all(ids.map((id) => getCarDetailsAutoRia(id)));

const updateComplectationPricesFromAutoria = async (
  complectationId: string,
): Promise<void> => {
  const carsIds = await getCarsIdsFromAutoria(complectationId);
  if (carsIds.length === 0) return;

  const pricesData = await getCarDetailsFromAutoria(carsIds);
  const prices: number[] = pricesData.map((data) => data.USD);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  await prisma.prices_Range.updateMany({
    where: {
      complectation_id: complectationId,
    },
    data: {
      price_start: minPrice,
      price_end: maxPrice,
    },
  });
};

const carsUpdatePricesFromAutoria = async (): Promise<void> => {
  const complectations = await prisma.complectation.findMany({
    select: {
      id: true,
    },
  });

  await Promise.all(
    complectations.map((complectation) =>
      updateComplectationPricesFromAutoria(complectation.id),
    ),
  );
};

export { carsUpdatePricesFromAutoria };
