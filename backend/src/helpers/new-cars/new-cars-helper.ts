import { NewCarsPrices, NewCarsBrand } from '@common/types/types';
import {
  getfourNewCars,
  getRangeCar,
  getCarBrand,
} from '@services/new-cars/new-cars.service';

const carsWithPrices = async (): Promise<NewCarsPrices[]> => {
  const newCars = await getfourNewCars();
  const priceRanges = await Promise.all(
    newCars.map(async (car) => await getRangeCar(car.id)),
  );
  const carsWithPreces: NewCarsPrices[] = [];

  for (const car of newCars) {
    for (const price of priceRanges) {
      if (car.id === price?.model_id) {
        const { name, description, manufacturer_id } = { ...car };
        const photo_urls = car.photo_urls as string[];
        const { price_start, price_end } = { ...price };
        carsWithPreces.push({
          name,
          description,
          photo_urls,
          price_start,
          price_end,
          manufacturer_id,
        });
        break;
      }
    }
  }

  return carsWithPreces;
};

const carsWithBrandes = async (
  newCars: NewCarsPrices[],
): Promise<NewCarsBrand[]> => {
  const brands = await Promise.all(
    newCars.map(async (car) => await getCarBrand(car.manufacturer_id)),
  );
  const carsBrand: NewCarsBrand[] = [];

  for (const car of newCars) {
    for (const brand of brands) {
      if (car.manufacturer_id === brand?.id) {
        const { name: brand_name, logo_url } = { ...brand };
        carsBrand.push({
          brand_name,
          logo_url,
          ...car,
        });
        break;
      }
    }
  }

  return carsBrand;
};

export { carsWithPrices, carsWithBrandes };
