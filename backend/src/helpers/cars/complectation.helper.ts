import type {
  ComplectationShortInfoDto,
  ComlectationShortInfoResponse,
} from '@autoline/shared';

const formatComplectationDtoResponse = (
  data: ComplectationShortInfoDto,
): ComlectationShortInfoResponse => ({
  id: data.id,
  complectationName: data.name,
  brandName: data.model.brand.name,
  modelName: data.model.name,
  photos: data.model.photo_urls,
  priceStart: data.model.prices_ranges[0].price_start,
  priceEnd: data.model.prices_ranges[0].price_end,
});

export { formatComplectationDtoResponse };
