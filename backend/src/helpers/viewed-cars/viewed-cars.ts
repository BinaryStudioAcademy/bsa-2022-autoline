import type {
  ViewedCarPrismaDto,
  ViewedCarResponseDto,
} from '@autoline/shared';

const formatDtoForResponse = (
  data: ViewedCarPrismaDto,
): ViewedCarResponseDto => ({
  brand: data.brand.name,
  model: data.name,
  complectation: data.complectations[0] ? data.complectations[0].name : '',
  year: data.year_end
    ? `${data.year_start} - ${data.year_end}`
    : String(data.year_start),
  photo_urls: data.photo_urls,
  price: `$ ${data.prices_ranges[0].price_start} - ${data.prices_ranges[0].price_end}`,
});

export { formatDtoForResponse };