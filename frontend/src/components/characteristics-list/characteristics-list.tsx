import { FC } from 'react';

import { ComplectationReturnedData } from '@autoline/shared';
import { CharacteristicsGroupProps } from '@common/types/characteristics-list/characteristics-list';
import { CircularProgress, useMediaQuery } from '@mui/material';
import { useGetComplectationsForPanelQuery } from '@store/queries/details-panel';

import { CharacteristicsGroup } from './characteristics-group/characteristics-group';
import {
  splitOptionsIntoColums,
  сreateGeneralInfoGroup,
} from './helpers/helpers';
import styles from './styles.module.scss';

interface CharacteristicsListProps {
  complectationId: string;
}

export const CharacteristicsList: FC<CharacteristicsListProps> = ({
  complectationId,
}) => {
  const { data, isLoading } = useGetComplectationsForPanelQuery({
    modelId: '',
    complectationId,
  });

  let numberOfColumns = 4;
  if (useMediaQuery('(max-width:52rem)')) {
    numberOfColumns = 2;
  }
  if (useMediaQuery('(max-width:32rem)')) {
    numberOfColumns = 1;
  }

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  const complectation = data as ComplectationReturnedData;
  const modelName = `${complectation.brand} ${complectation.model} ${complectation.name}`;

  const generalInfo = сreateGeneralInfoGroup(
    complectation as ComplectationReturnedData,
  );

  const columnLists = splitOptionsIntoColums(complectation.options, 3);

  let outputColums: CharacteristicsGroupProps[][] = [];

  if (numberOfColumns === 4) {
    outputColums = [[generalInfo], ...columnLists];
  }
  if (numberOfColumns === 2) {
    outputColums = [
      [generalInfo, ...columnLists[0]],
      [...columnLists[1], ...columnLists[2]],
    ];
  }
  if (numberOfColumns === 1) {
    outputColums = [[generalInfo]];
    columnLists.forEach((characteristicsGroups): void => {
      outputColums[0].push(...characteristicsGroups);
    });
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.header}> {modelName} </h4>
      <div className={styles.pillRow}>
        {complectation.options.important.map((feature: string) => (
          <span className={styles.pill}>{feature}</span>
        ))}
      </div>

      <div className={styles.bodyRow}>
        {outputColums.map((column, columnId) => (
          <div className={styles.bodyColumn} key={columnId}>
            {column.map((optionGroup) => (
              <CharacteristicsGroup key={optionGroup.name} {...optionGroup} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
