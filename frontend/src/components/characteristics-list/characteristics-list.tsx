import { FC } from 'react';

import { CharacteristicsListInfoProps } from '@common/types/characteristics-list/characteristics-list';
import clsx from 'clsx';

import { CharacteristicsGroup } from './characteristics-group/characteristics-group';
import { mockCarInfo } from './mock-car-info';
import styles from './styles.module.scss';

export const CharacteristicsList: FC = () => {
  const carInfo = mockCarInfo as CharacteristicsListInfoProps;
  const groups = carInfo.optionGroups;
  return (
    <div className={styles.container}>
      <h5 className={styles.header}>{carInfo.modelName}</h5>
      <div className={styles.pillRow}>
        {carInfo.importantFeatures.map((feature: string) => (
          <span className={clsx('body1', styles.pill)}>{feature}</span>
        ))}
      </div>
      <div className={styles.bodyRow}>
        <div className={styles.bodyColumn}>
          <CharacteristicsGroup key={0} {...groups[0]} />
        </div>
        <div className={styles.bodyColumn}>
          <CharacteristicsGroup key={1} {...groups[1]} />
          <CharacteristicsGroup key={2} {...groups[2]} />
        </div>
        <div className={styles.bodyColumn}>
          <CharacteristicsGroup key={3} {...groups[3]} />
        </div>
        <div className={styles.bodyColumn}>
          <CharacteristicsGroup key={4} {...groups[4]} />
          <CharacteristicsGroup key={5} {...groups[5]} />
        </div>
      </div>
    </div>
  );
};
