import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';

import { CollapseElement } from '@components/collapse-component/collapse-element/collapse-element';
import { Spinner } from '@components/common/spinner/spinner';
import { getElementHeightWithMargins } from '@helpers/utils/get-element-height-with-margins';
import { uuid4 } from '@sentry/utils';
import { useGetComparisonGeneralInfoQuery } from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

enum TableFields {
  bodyType = 'bodyType',
  engine = 'engine',
  engineDisplacement = 'engineDisplacement',
  enginePower = 'enginePower',
  colorName = 'colorName',
  transmissionTypeName = 'transmissionTypeName',
  drivetrainName = 'drivetrainName',
  fuelTypeName = 'fuelTypeName',
}

const GeneralComparisonTable: React.FC<{ toggle: boolean }> = ({ toggle }) => {
  const {
    data: generalInfo,
    isLoading,
    refetch,
  } = useGetComparisonGeneralInfoQuery();

  const options: Set<string> = useMemo((): Set<string> => {
    const options: Set<string> = new Set();
    generalInfo?.forEach((car) =>
      Object.keys(car.options).map((optionType: string) =>
        options.add(optionType),
      ),
    );
    return options;
  }, [generalInfo]);

  const getFieldStatus = (field: TableFields): boolean => {
    return generalInfo?.every(
      (item) => item[field] === generalInfo[0][field],
    ) as boolean;
  };

  const differenceTableFields = useMemo(
    () => ({
      bodyType: getFieldStatus(TableFields.bodyType),
      engine: getFieldStatus(TableFields.engine),
      engineDisplacement: getFieldStatus(TableFields.engineDisplacement),
      enginePower: getFieldStatus(TableFields.enginePower),
      colorName: getFieldStatus(TableFields.colorName),
      transmissionTypeName: getFieldStatus(TableFields.transmissionTypeName),
      drivetrainName: getFieldStatus(TableFields.drivetrainName),
      fuelTypeName: getFieldStatus(TableFields.fuelTypeName),
    }),
    [generalInfo],
  );

  const [compareFields, setCompareFields] = useState(differenceTableFields);

  const appyOnlyDifference = (): void => {
    setCompareFields(differenceTableFields);
  };

  const appyAll = (): void => {
    setCompareFields({
      bodyType: false,
      engine: false,
      engineDisplacement: false,
      enginePower: false,
      colorName: false,
      transmissionTypeName: false,
      drivetrainName: false,
      fuelTypeName: false,
    });
  };

  useEffect(() => {
    if (toggle) {
      appyOnlyDifference();
    } else {
      appyAll();
    }
  }, [toggle]);

  const carOmitOptions = useMemo(() => {
    const carsOptions = new Set<string>();
    options.forEach((optionType) => {
      generalInfo?.forEach((item) => {
        item.options[optionType]
          .filter((option) => {
            return generalInfo.every((item) =>
              item.options[optionType].includes(option),
            );
          })
          .map((option) => carsOptions.add(option));
      });
    });
    return carsOptions;
  }, [generalInfo, options]);

  const [generalTable, setGeneralTableRef] = useState<HTMLDivElement | null>(
    null,
  );

  const broadcast = new BroadcastChannel('compare');
  useEffect(() => {
    broadcast.onmessage = (): void => {
      refetch();
    };
  }, [broadcast, refetch]);

  useLayoutEffect(() => {
    if (!generalTable) return;

    //Get all options table cells
    const optionsValuesElements = generalTable.querySelectorAll(
      '[data-optionvalue]',
    ) as NodeListOf<HTMLDivElement>;
    const optionsValues = [...optionsValuesElements];

    //Create list of heights for all options
    const optionsHighestHeights = new Map();

    //Go through all options cells to find the larger height of cell
    optionsValues.forEach((value: HTMLDivElement) => {
      const borderHeight = 1;
      //Get height and option title of current table cell
      const height = getElementHeightWithMargins(value) + borderHeight;
      const title = value.getAttribute('data-optionvalue');

      //If current table cell has larger height then similar cell of other car, accept it as highest height
      if (
        height > optionsHighestHeights.get(title) ||
        !optionsHighestHeights.has(title)
      ) {
        optionsHighestHeights.set(title, height);
      }
    });

    //Go through all options cells to set heights of cells
    optionsValues.forEach((value: HTMLDivElement) => {
      const title = value.getAttribute('data-optionvalue');
      //Get title cell of the option, e.g. `Security`
      const tableTitleElement = generalTable.querySelector(
        `[data-optiontitle=${title}]`,
      ) as HTMLDivElement;

      //Set the same height for similar options of cars and their titles
      //e.g. `Security` cells for all cars have height 100px
      value.style.height = `${optionsHighestHeights.get(title)}px`;
      tableTitleElement.style.height = `${optionsHighestHeights.get(title)}px`;
    });
  }, [generalTable, generalInfo, toggle]);

  if (isLoading) return <Spinner />;

  return (
    <CollapseElement label="General information" isOpen={true}>
      <div className={styles.table} ref={setGeneralTableRef}>
        <div className={clsx(styles.tableTitles, styles.tableColumn)}>
          {compareFields.bodyType || (
            <div className={styles.tableCell} data-optiontitle="bodytype">
              Type
            </div>
          )}
          {compareFields.engineDisplacement || (
            <div className={styles.tableCell} data-optiontitle="motor">
              Motor
            </div>
          )}
          {compareFields.enginePower || (
            <div className={styles.tableCell} data-optiontitle="enginepower">
              Engine Power
            </div>
          )}
          {compareFields.engine || (
            <div className={styles.tableCell} data-optiontitle="engine">
              Engine
            </div>
          )}
          {compareFields.drivetrainName || (
            <div className={styles.tableCell} data-optiontitle="wheeldrive">
              Wheel Drive
            </div>
          )}
          {[...options].map((option) => (
            <div
              className={styles.tableCell}
              data-optiontitle={option}
              key={uuid4()}
            >
              {option}
            </div>
          ))}
          {compareFields.colorName || (
            <div className={styles.tableCell}>Color</div>
          )}
        </div>
        <ScrollSyncPane>
          <div className={clsx('styledScrollbar', styles.generalInfo)}>
            {generalInfo?.map((info) => {
              return (
                <div
                  className={clsx(styles.tableData, styles.tableColumn)}
                  key={info.id}
                >
                  {compareFields.bodyType || (
                    <div
                      className={styles.tableCell}
                      data-optionvalue="bodytype"
                    >
                      {info.bodyType}
                    </div>
                  )}
                  {compareFields.engineDisplacement || (
                    <div className={styles.tableCell} data-optionvalue="motor">
                      {info.engineDisplacement} l.
                    </div>
                  )}
                  {compareFields.enginePower || (
                    <div
                      className={styles.tableCell}
                      data-optionvalue="enginepower"
                    >
                      {info.enginePower} h.p.
                    </div>
                  )}
                  {compareFields.engine || (
                    <div className={styles.tableCell} data-optionvalue="engine">
                      {info.engine}
                    </div>
                  )}
                  {compareFields.drivetrainName || (
                    <div
                      className={styles.tableCell}
                      data-optionvalue="wheeldrive"
                    >
                      {info.drivetrainName}
                    </div>
                  )}
                  {Object.keys(info.options).map((type: string) => (
                    <div
                      className={styles.tableCell}
                      data-optionvalue={type}
                      key={uuid4()}
                    >
                      {info.options[type]
                        .filter(
                          (option) => !toggle || !carOmitOptions.has(option),
                        )
                        .join(', ')}
                    </div>
                  ))}
                  {compareFields.colorName || (
                    <div className={clsx(styles.tableCell, styles.colorCell)}>
                      <div
                        className={styles.colorBox}
                        style={{ backgroundColor: info.colorName }}
                      />
                      <span>{info.colorName}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollSyncPane>
      </div>
    </CollapseElement>
  );
};

export { GeneralComparisonTable };
