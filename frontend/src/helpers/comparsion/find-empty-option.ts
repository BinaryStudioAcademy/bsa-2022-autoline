import { ComparisonGeneralInform } from '@autoline/shared';

const findEmptyOptions = (
  generalInfo: ComparisonGeneralInform[] | undefined,
  toggle: boolean,
  carOmitOptions: Set<string>,
): string[] | undefined => {
  const emptyOptions = generalInfo?.map((e) =>
    Object.entries(e.options)
      .filter(
        (option) =>
          option[1].filter((option) => !toggle || !carOmitOptions.has(option))
            .length == 0,
      )
      .map((option) => option[0]),
  );
  const emptyOptionsForAll = emptyOptions?.reduce((accumulator, currentValue) =>
    accumulator.filter((x) => currentValue.indexOf(x) !== -1),
  );
  return emptyOptionsForAll;
};

export { findEmptyOptions };
