import React, { useState, useLayoutEffect } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';

import { CollapseElement } from '@components/collapse-component/collapse-element/collapse-element';
import { Spinner } from '@components/common/spinner/spinner';
import { getElementHeightWithMargins } from '@helpers/utils/get-element-height-with-margins';
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
    return <p style={{ color, margin: '0', fontSize: 20 }}>{symbol}</p>;
  };

  const [optionsTable, setOptionsTableRef] = useState<HTMLDivElement | null>(
    null,
  );

  useLayoutEffect(() => {
    if (!optionsTable) return;
    const optionTitle = optionsTable.querySelectorAll(
      '[data-title]',
    ) as NodeListOf<HTMLDivElement>;

    optionTitle.forEach((option) => {
      const title = option.getAttribute('data-title');
      const tableElement = optionsTable.querySelectorAll(
        `[data-value="${title}"]`,
      ) as NodeListOf<HTMLDivElement>;

      tableElement.forEach(
        (element) =>
          (element.style.height = `${
            getElementHeightWithMargins(option) + 1
          }px`),
      );
    });
  }, [optionsTable, optionNames]);

  return (
    <CollapseElement label={title}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.table} ref={setOptionsTableRef}>
          <div className={clsx(styles.tableTitles, styles.tableColumn)}>
            {optionNames?.map((option) => (
              <div
                className={styles.tableCell}
                key={uuid4()}
                data-title={option}
              >
                {option}
              </div>
            ))}
          </div>
          <ScrollSyncPane>
            <div className={clsx('styledScrollbar', styles.generalInfo)}>
              {cars?.map((car) => (
                <div className={styles.tableColumn} key={uuid4()}>
                  {optionNames?.map((optionName) => (
                    <div
                      className={styles.tableCell}
                      key={uuid4()}
                      data-value={optionName}
                    >
                      {getOptionSymbol(car.options[title].includes(optionName))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollSyncPane>
        </div>
      )}
    </CollapseElement>
  );
};

export { OptionsSubtable };
