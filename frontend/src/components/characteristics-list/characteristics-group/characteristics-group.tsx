import { FC } from 'react';

import { CharacteristicsGroupProps } from '@common/types/characteristics-list/characteristics-list';

import styles from './styles.module.scss';

export const CharacteristicsGroup: FC<CharacteristicsGroupProps> = ({
  name,
  options,
}) => {
  return (
    <>
      <h5 className={styles.title}>{name}</h5>
      {options.map((option) => (
        <div className={styles.option} key={option.value}>
          {'name' in option && (
            <div className={styles.optionName}>{option.name}</div>
          )}
          {'color' in option && option.color && (
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
