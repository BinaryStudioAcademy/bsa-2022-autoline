import { AllComparisonsPrismaDto, ComparisonDetail } from '@autoline/shared';

const formatAllComparisonsResponse = (
  data: AllComparisonsPrismaDto[],
): ComparisonDetail[] =>
  data.map((item) => ({
    complectationId: item.complectation.id,
    position: item.position,
    brandName: item.complectation.model.brand.name,
    modelName: item.complectation.model.name,
    complectationName: item.complectation.name,
    year: item.complectation.model.year_end
      ? `${item.complectation.model.year_start} - ${item.complectation.model.year_end}`
      : `${item.complectation.model.year_start}`,
    photos: JSON.parse(item.complectation.model.photo_urls as string),
    priceStart: item.complectation.prices_ranges[0].price_start,
    priceEnd: item.complectation.prices_ranges[0].price_end,
  }));

export { formatAllComparisonsResponse };
