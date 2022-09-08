import { ComplectationReturnedData, OptionType } from '@autoline/shared';
import { CharacteristicsGroupProps } from '@common/types/characteristics-list/characteristics-list';

interface AddOptionParams {
  group: CharacteristicsGroupProps;
  data: (string | number | undefined)[];
  name: string;
  isColor?: boolean;
  suffix?: string;
}

const addOption = ({
  group,
  data,
  name,
  isColor = false,
  suffix = '',
}: AddOptionParams): void => {
  if (data && data[0]) {
    const optionItem = group.options.find((item) => item.name === name);

    if (optionItem) {
      optionItem.value =
        optionItem.value + ', ' + data[0] + (suffix ? ' ' + suffix : '');
    }

    if (!optionItem) {
      group.options.push({
        name,
        value: '' + data[0] + (suffix ? ' ' + suffix : ''),
        color: isColor ? (data[0] as string) : undefined,
      });
    }
  }
};

export const сreateGeneralInfoGroup = (
  complectation: ComplectationReturnedData,
): CharacteristicsGroupProps => {
  const generalInfo: CharacteristicsGroupProps = {
    name: 'General Inform',
    options: [],
  };

  addOption({
    group: generalInfo,
    data: complectation.colors,
    name: 'Color',
    isColor: true,
  });

  addOption({
    group: generalInfo,
    data: complectation.fuelTypes,
    name: 'Motor',
  });

  addOption({
    group: generalInfo,
    data: complectation.engineDisplacements,
    suffix: 'l.',
    name: 'Motor',
  });

  addOption({
    group: generalInfo,
    data: complectation.transmissionTypes,
    name: 'Transmission',
  });

  addOption({
    group: generalInfo,
    data: complectation.drivetrains,
    name: 'Wheel Drive',
  });

  return generalInfo;
};

export const splitOptionsIntoColums = (
  allOptions: OptionType,
  numberOfColumns: number,
): CharacteristicsGroupProps[][] => {
  let totalAmountItems = 0;

  const allOptionsArray = Object.entries(allOptions);
  allOptionsArray.forEach((optionsSet) => {
    if (optionsSet[0] !== 'important' && optionsSet[1].length > 0) {
      totalAmountItems += optionsSet[1].length + 2;
    }
  });

  const colums = Array(numberOfColumns)
    .fill('')
    .map(() => []) as CharacteristicsGroupProps[][];
  const averageColumnSize = Math.round(totalAmountItems / numberOfColumns);
  let currentColumnNumber = 0;
  let currentColumnSize = 0;

  allOptionsArray.forEach((optionsSet) => {
    if (optionsSet[0] !== 'important' && optionsSet[1].length > 0) {
      const predictedColumnSize = currentColumnSize + optionsSet[1].length + 2;
      if (
        predictedColumnSize - averageColumnSize > 2 &&
        currentColumnNumber + 1 < numberOfColumns
      ) {
        currentColumnNumber += 1;
        currentColumnSize = 0;
      }

      const optionsGroup: CharacteristicsGroupProps = {
        name: optionsSet[0],
        options: optionsSet[1].map((i) => ({ value: i })),
      };

      colums[currentColumnNumber].push(optionsGroup);
      currentColumnSize += optionsSet[1].length + 2;
    }
  });

  return colums;
};
