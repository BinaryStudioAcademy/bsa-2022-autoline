import React from 'react';

import { CollapseElement } from '@components/collapse-component/collapse-element/collapse-element';
import { Spinner } from '@components/common/spinner/spinner';
import { uuid4 } from '@sentry/utils';
import {
  useGetComparisonGeneralInfoQuery,
  useGetComparisonOptionsQuery,
} from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

enum HTMLSymbol {
  check = 10003,
  times = 215,
}
enum Color {
  green = '#008000',
  red = '#e81414',
}

const OptionsSubtable: React.FC<{ title: string }> = ({ title }) => {
  const { data: optionNames, isLoading } = useGetComparisonOptionsQuery({
    type: title,
  });

  const { data: cars } = useGetComparisonGeneralInfoQuery();

  const getOptionSymbol = (isOptionExists: boolean): JSX.Element => {
    const symbol = String.fromCharCode(
      isOptionExists ? HTMLSymbol.check : HTMLSymbol.times,
    );
    const color = isOptionExists ? Color.green : Color.red;
    return <p style={{ color, margin: '0' }}>{symbol}</p>;
  };

  return (
    <CollapseElement label={title}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.table}>
          <div className={clsx(styles.tableTitles, styles.tableColumn)}>
            {optionNames?.map((option) => (
              <div className={styles.tableCell} key={uuid4()}>
                {option}
              </div>
            ))}
          </div>
          <div className={clsx('styledScrollbar', styles.generalInfo)}>
            {cars?.map((car) => (
              <div className={styles.tableColumn} key={uuid4()}>
                {optionNames?.map((optionName) => (
                  <div className={styles.tableCell} key={uuid4()}>
                    {getOptionSymbol(car.options[title].includes(optionName))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </CollapseElement>
  );
};

export { OptionsSubtable };
