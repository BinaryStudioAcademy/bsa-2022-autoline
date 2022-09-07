import React from 'react';

import { CollapseElement } from '@components/collapse-component/collapse-element/collapse-element';
import { Spinner } from '@components/common/spinner/spinner';
import { uuid4 } from '@sentry/utils';
import { useGetComparisonOptionsQuery } from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

interface SubTableProps {
  title: string;
  options: {
    name: string;
    type: string;
  }[];
}

enum Entity {
  check = 10003,
  times = 215,
}

const OptionsSubtable: React.FC<SubTableProps> = ({ title, options }) => {
  const { data: optionNames, isLoading } = useGetComparisonOptionsQuery({
    type: title,
  });

  const getOptionSymbol = (name: string, option: string): JSX.Element => {
    const symbol = String.fromCharCode(
      name === option ? Entity.check : Entity.times,
    );
    const color = name === option ? 'green' : 'red';
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
            {options.map((option) => (
              <div className={styles.tableColumn} key={uuid4()}>
                {optionNames?.map((optionName) => (
                  <div className={styles.tableCell} key={uuid4()}>
                    {getOptionSymbol(option.name, optionName)}
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
