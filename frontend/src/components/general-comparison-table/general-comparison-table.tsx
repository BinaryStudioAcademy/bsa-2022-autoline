import { useLayoutEffect, useState } from 'react';

import { CollapseElement } from '@components/collapse-component/collapse-element/collapse-element';
import { Spinner } from '@components/common/spinner/spinner';
import { getElementHeightWithMargins } from '@helpers/utils/get-element-height-with-margins';
import { useGetComparisonGeneralInfoQuery } from '@store/queries/comparison';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const GeneralComparisonTable: React.FC = () => {
  const { data: generalInfos, isLoading } = useGetComparisonGeneralInfoQuery();

  const options: Set<string> = new Set();
  generalInfos?.forEach((car) =>
    Object.keys(car.options).map((optionType: string) =>
      options.add(optionType),
    ),
  );

  const [generalTable, setGeneralTableRef] = useState<HTMLDivElement | null>(
    null,
  );

  useLayoutEffect(() => {
    if (!generalTable) return;

    const optionsValues = generalTable.querySelectorAll(
      '[data-optionvalue]',
    ) as NodeListOf<HTMLDivElement>;

    const optionsHighestHeights = new Map();

    [...optionsValues].forEach((value: HTMLDivElement) => {
      const borderHeight = 1;
      const height = getElementHeightWithMargins(value) + borderHeight;
      const title = value.getAttribute('data-optionvalue');

      if (
        height > optionsHighestHeights.get(title) ||
        !optionsHighestHeights.has(title)
      ) {
        optionsHighestHeights.set(title, height);
      }
    });

    [...optionsValues].forEach((value: HTMLDivElement) => {
      const title = value.getAttribute('data-optionvalue');
      const tableTitleElement = generalTable.querySelector(
        '[data-optiontitle=' + title + ']',
      ) as HTMLDivElement;
      value.style.height = `${optionsHighestHeights.get(title)}px`;
      tableTitleElement.style.height = `${optionsHighestHeights.get(title)}px`;
    });
  }, [generalTable]);

  if (isLoading) return <Spinner />;

  return (
    <CollapseElement label="General inform">
      <div className={styles.table} ref={setGeneralTableRef}>
        <div className={clsx(styles.tableTitles, styles.tableColumn)}>
          <div className={styles.tableCell} data-optiontitle="bodytype">
            Type
          </div>
          <div className={styles.tableCell} data-optiontitle="motor">
            Motor
          </div>
          <div className={styles.tableCell} data-optiontitle="enginepower">
            Engine Power
          </div>
          <div className={styles.tableCell} data-optiontitle="engine">
            Engine
          </div>
          <div className={styles.tableCell} data-optiontitle="wheeldrive">
            Wheel Drive
          </div>
          {[...options].map((option) => (
            <div className={styles.tableCell} data-optiontitle={option}>
              {option}
            </div>
          ))}
          <div className={styles.tableCell}>Color</div>
        </div>
        <div className={clsx('styledScrollbar', styles.generalInfos)}>
          {generalInfos?.map((info) => {
            return (
              <div className={clsx(styles.tableData, styles.tableColumn)}>
                <div className={styles.tableCell} data-optionvalue="bodytype">
                  {info.bodyType}
                </div>
                <div className={styles.tableCell} data-optionvalue="motor">
                  {info.engineDisplacement} l.
                </div>
                <div
                  className={styles.tableCell}
                  data-optionvalue="enginepower"
                >
                  {info.enginePower} h.p.
                </div>
                <div className={styles.tableCell} data-optionvalue="engine">
                  {info.engine}
                </div>
                <div className={styles.tableCell} data-optionvalue="wheeldrive">
                  {info.drivetrainName}
                </div>
                {Object.keys(info.options).map((type: string) => (
                  <div className={styles.tableCell} data-optionvalue={type}>
                    {info.options[type].join(', ')}
                  </div>
                ))}
                <div className={clsx(styles.tableCell, styles.colorCell)}>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: info.colorName }}
                  />
                  <span>{info.colorName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CollapseElement>
  );
};

export { GeneralComparisonTable };
