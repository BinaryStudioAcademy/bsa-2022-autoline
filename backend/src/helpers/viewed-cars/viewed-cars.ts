import type {
  ViewedCarPrismaDto,
  ViewedCarResponseDto,
} from '@autoline/shared';

const formatDtoForResponse = (
  data: ViewedCarPrismaDto,
): ViewedCarResponseDto => ({
  modelId: data.id,
  brand: data.brand.name,
  model: data.name,
  complectation: data.complectations[0] ? data.complectations[0].name : '',
  year: data.year_end
    ? `${data.year_start} - ${data.year_end}`
    : `${data.year_start}`,
  photo_urls: data.photo_urls,
  priceStart: `${data.complectations[0].prices_ranges[0].price_start}`,
  priceEnd: `${data.complectations[0].prices_ranges[0].price_end}`,
});

export { formatDtoForResponse };
