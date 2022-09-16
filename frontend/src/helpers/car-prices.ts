import { ComparisonInfo } from '@autoline/shared';
import { formatPrice } from '@helpers/helpers';

interface CarPrices {
  minPrice: string;
  maxPrice: string;
}

const getPrices = (
  id: string,
  pricesData: ComparisonInfo[] | undefined,
): CarPrices | null => {
  if (!pricesData) return null;
  const carData = pricesData?.find((car) => car.id === id);
  if (carData) {
    const minPrice = formatPrice(carData.priceStart) as string;
    const maxPrice = formatPrice(carData.priceEnd) as string;
    const currectPrices: CarPrices = { minPrice, maxPrice };
    return currectPrices;
  }
  return null;
};

export { getPrices };
