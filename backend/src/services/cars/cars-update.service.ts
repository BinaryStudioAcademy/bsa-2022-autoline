import {
  CarDetailsResponse,
  CarsSearchAutoriaParams,
} from '@common/types/types';
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
): Promise<CarDetailsResponse[]> => {
  const carsPromices: Promise<CarDetailsResponse>[] = [];
  ids.forEach((id) => {
    carsPromices.push(getCarDetailsAutoRia(id));
  });
  return Promise.all(carsPromices);
};

const carsUpdatePricesFromAutoria = async (
  complectationId: string,
): Promise<void> => {
  const carsIds = await getCarsIdsFromAutoria(complectationId);
  const pricesData = await getCarDetailsFromAutoria(carsIds);
  const prices: number[] = pricesData.map((data) => data.USD);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // eslint-disable-next-line no-console
  console.log(carsIds);
  // eslint-disable-next-line no-console
  console.log(prices);
  // eslint-disable-next-line no-console
  console.log(`minPrice: ${minPrice}, maxPrice: ${maxPrice}`);
};

export { carsUpdatePricesFromAutoria };
