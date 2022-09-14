import { ComparisonGeneralInform } from '@autoline/shared';

const findEmptyOptions = (
  generalInfo: ComparisonGeneralInform[] | undefined,
  isOnlyDiff: boolean,
  carOmitOptions: Set<string>,
): string[] | undefined => {
  const emptyOptions = generalInfo?.map((e) =>
    Object.entries(e.options)
      .filter(
        ([_optionName, optioValue]) =>
          optioValue.filter(
            (option) => !isOnlyDiff || !carOmitOptions.has(option),
          ).length == 0,
      )
      .map(([optionName, _optioValue]) => optionName),
  );
  const emptyOptionsForAll = emptyOptions?.reduce(
    (accumulator, currentValue) =>
      accumulator.filter((x) => currentValue.indexOf(x) !== -1),
    [],
  );
  return emptyOptionsForAll;
};

export { findEmptyOptions };
