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
  modelId: string,
  complectationId: string,
  complectationName: string,
): Promise<string> => {
  const carsIds = await getCarsIdsFromAutoria(complectationId);
  if (carsIds.length === 0) return '';

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

  const priceModelData = await prisma.prices_Range.aggregate({
    where: {
      complectation: {
        model_id: modelId,
      },
    },
    _min: {
      price_start: true,
    },
    _max: {
      price_end: true,
    },
  });
  const minPriceModel = priceModelData._min.price_start;
  const maxPriceModel = priceModelData._max.price_end;

  if (minPriceModel) {
    await prisma.prices_Range.updateMany({
      where: {
        model_id: modelId,
      },
      data: {
        price_start: minPriceModel,
      },
    });
  }

  if (maxPriceModel) {
    await prisma.prices_Range.updateMany({
      where: {
        model_id: modelId,
      },
      data: {
        price_end: maxPriceModel,
      },
    });
  }

  return complectationName;
};

const carsUpdatePricesFromAutoria = async (): Promise<string[]> => {
  const complectations = await prisma.complectation.findMany({
    select: {
      id: true,
      name: true,
      model: {
        select: {
          id: true,
          name: true,
          brand: true,
        },
      },
    },
  });

  const updatedComplectations = await Promise.all(
    complectations.map((complectation) =>
      updateComplectationPricesFromAutoria(
        complectation.model.id,
        complectation.id,
        `${complectation.model.brand.name} ${complectation.model.name} ${complectation.name}`,
      ),
    ),
  );

  return updatedComplectations.filter(
    (carComplectation) => carComplectation !== '',
  );
};

export { carsUpdatePricesFromAutoria };
