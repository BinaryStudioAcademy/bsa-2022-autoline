import { CarsSearchAutoriaParams } from '@common/types/cars/autoria-request-params';
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

const carsUpdatePricesFromAutoria = async (
  complectationId: string,
): Promise<void> => {
  const carsIds = await getCarsIdsFromAutoria(complectationId);

  // eslint-disable-next-line no-console
  console.log(carsIds);
};

export { carsUpdatePricesFromAutoria };
