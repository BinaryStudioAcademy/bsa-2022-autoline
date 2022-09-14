import {
  ComparisonInfo,
  ComlectationShortInfoResponse,
} from '@autoline/shared';

const formatComparisonShortData = (
  data: ComparisonInfo[],
): ComlectationShortInfoResponse[] => {
  return data.map(
    ({
      id,
      brandName,
      complectationName,
      modelName,
      priceEnd,
      priceStart,
      photos,
    }) => ({
      id,
      brandName,
      complectationName,
      modelName,
      priceEnd,
      priceStart,
      photos,
    }),
  );
};

export { formatComparisonShortData };
