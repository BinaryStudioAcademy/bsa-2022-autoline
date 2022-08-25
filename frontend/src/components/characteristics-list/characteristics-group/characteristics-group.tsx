import { FC } from 'react';

import { CharacteristicsGroupProps } from '@common/types/characteristics-list/characteristics-list';
import clsx from 'clsx';

import styles from './styles.module.scss';

export const CharacteristicsGroup: FC<CharacteristicsGroupProps> = ({
  name,
  options,
}) => {
  return (
    <>
      <h6 className={styles.title}>{name}</h6>
      {options.map((option) => (
        <div className={clsx('body2', styles.option)}>
          {'name' in option && (
            <div className={styles.optionName}>{option.name}</div>
          )}
          {'color' in option && (
            <div
              className={styles.optionColor}
              style={{ backgroundColor: option.color }}
            ></div>
          )}
          <div className={styles.optionValue}>{option.value}</div>
        </div>
      ))}
    </>
  );
};
