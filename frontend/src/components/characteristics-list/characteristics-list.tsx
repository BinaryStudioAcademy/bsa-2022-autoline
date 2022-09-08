import { FC } from 'react';

import { ComplectationReturnedData } from '@autoline/shared';
import { CircularProgress } from '@mui/material';
import { useGetComplectationsForPanelQuery } from '@store/queries/details-panel';
import { clsx } from 'clsx';

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

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  const complectation = data as ComplectationReturnedData;
  const modelName = `${complectation.brand} ${complectation.model} ${complectation.name}`;

  const generalInfo = сreateGeneralInfoGroup(
    complectation as ComplectationReturnedData,
  );

  const columnLists = splitOptionsIntoColums(complectation.options, 3);

  return (
    <div className={styles.container}>
      <h4 className={styles.header}> {modelName} </h4>
      <div className={styles.pillRow}>
        {complectation.options.important.map((feature: string) => (
          <span className={clsx('body1', styles.pill)}>{feature}</span>
        ))}
      </div>
      <div className={styles.bodyRow}>
        <div className={styles.bodyColumn}>
          <CharacteristicsGroup key={generalInfo.name} {...generalInfo} />
        </div>
        <div className={styles.bodyColumn}>
          {columnLists[0].map((optionGroup) => (
            <CharacteristicsGroup key={optionGroup.name} {...optionGroup} />
          ))}
        </div>
        <div className={styles.bodyColumn}>
          {columnLists[1].map((optionGroup) => (
            <CharacteristicsGroup key={optionGroup.name} {...optionGroup} />
          ))}
        </div>
        <div className={styles.bodyColumn}>
          {columnLists[2].map((optionGroup) => (
            <CharacteristicsGroup key={optionGroup.name} {...optionGroup} />
          ))}
        </div>
      </div>
    </div>
  );
};
