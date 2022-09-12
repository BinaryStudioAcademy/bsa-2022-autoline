import type {
  ComplectationShortInfoDto,
  ComlectationShortInfoResponse,
} from '@autoline/shared';

const formatComplectationDtoResponse = (
  data: ComplectationShortInfoDto,
): ComlectationShortInfoResponse => ({
  id: data.id,
  name: data.name,
  brand: data.model.brand.name,
  model: data.model.name,
  photo_urls: data.model.photo_urls,
  year: data.model.year_end
    ? `${data.model.year_start} - ${data.model.year_end}`
    : `${data.model.year_start}`,
  price: `$ ${data.model.prices_ranges[0].price_start} - ${data.model.prices_ranges[0].price_end}`,
});

export { formatComplectationDtoResponse };
