import { useEffect, useMemo } from 'react';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';
import { ScrollSyncPane } from 'react-scroll-sync';

import { TableFields } from '@common/enums/comparisons/comparison-table-fields';
import { CollapseElement } from '@components/collapse-component/collapse-element/collapse-element';
import { Spinner } from '@components/common/spinner/spinner';
import { findEmptyOptions } from '@helpers/helpers';
import { uuid4 } from '@sentry/utils';
import { useGetComparisonGeneralInfoQuery } from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const GeneralComparisonTable: React.FC<{ isOnlyDiff: boolean }> = ({
  isOnlyDiff,
}) => {
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

  const isIdentical = useMemo(
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

  const emptyOptions = findEmptyOptions(
    generalInfo,
    isOnlyDiff,
    carOmitOptions,
  );

  useEffect(() => {
    const broadcast = new BroadcastChannel('compare');
    broadcast.onmessage = (): void => {
      refetch();
    };
  }, [refetch]);

  if (isLoading) return <Spinner />;

  return (
    <CollapseElement label="General information" isOpen={true}>
      <EqualHeight>
        <div className={clsx(styles.table, 'table')}>
          <div className={clsx(styles.tableTitles, styles.tableColumn)}>
            {(!isOnlyDiff || !isIdentical.bodyType) && (
              <EqualHeightElement name="bodytype">
                <div className={clsx(styles.tableCell, 'tableCell')}>Type</div>
              </EqualHeightElement>
            )}
            {(!isOnlyDiff || !isIdentical.engineDisplacement) && (
              <EqualHeightElement name="motor">
                <div className={clsx(styles.tableCell, 'tableCell')}>Motor</div>
              </EqualHeightElement>
            )}
            {(!isOnlyDiff || !isIdentical.enginePower) && (
              <EqualHeightElement name="enginepower">
                <div className={clsx(styles.tableCell, 'tableCell')}>
                  Engine Power
                </div>
              </EqualHeightElement>
            )}
            {(!isOnlyDiff || !isIdentical.engine) && (
              <EqualHeightElement name="engine">
                <div className={clsx(styles.tableCell, 'tableCell')}>
                  Engine
                </div>
              </EqualHeightElement>
            )}
            {(!isOnlyDiff || !isIdentical.drivetrainName) && (
              <EqualHeightElement name="wheeldrive">
                <div className={clsx(styles.tableCell, 'tableCell')}>
                  Wheel Drive
                </div>
              </EqualHeightElement>
            )}
            {[...options].map((option) => {
              if (emptyOptions?.includes(option)) return;
              return (
                <EqualHeightElement name={option} key={uuid4()}>
                  <div className={clsx(styles.tableCell, 'tableCell')}>
                    {option}
                  </div>
                </EqualHeightElement>
              );
            })}
            {(!isOnlyDiff || !isIdentical.colorName) && (
              <div className={clsx(styles.tableCell, 'tableCell')}>Color</div>
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
                    {(!isOnlyDiff || !isIdentical.bodyType) && (
                      <EqualHeightElement name="bodytype">
                        <div className={clsx(styles.tableCell, 'tableCell')}>
                          {info.bodyType}
                        </div>
                      </EqualHeightElement>
                    )}
                    {(!isOnlyDiff || !isIdentical.engineDisplacement) && (
                      <EqualHeightElement name="motor">
                        <div className={clsx(styles.tableCell, 'tableCell')}>
                          {info.engineDisplacement} l.
                        </div>
                      </EqualHeightElement>
                    )}
                    {(!isOnlyDiff || !isIdentical.enginePower) && (
                      <EqualHeightElement name="enginepower">
                        <div className={clsx(styles.tableCell, 'tableCell')}>
                          {info.enginePower} h.p.
                        </div>
                      </EqualHeightElement>
                    )}
                    {(!isOnlyDiff || !isIdentical.engine) && (
                      <EqualHeightElement name="engine">
                        <div className={clsx(styles.tableCell, 'tableCell')}>
                          {info.engine}
                        </div>
                      </EqualHeightElement>
                    )}
                    {(!isOnlyDiff || !isIdentical.drivetrainName) && (
                      <EqualHeightElement name="wheeldrive">
                        <div className={clsx(styles.tableCell, 'tableCell')}>
                          {info.drivetrainName}
                        </div>
                      </EqualHeightElement>
                    )}
                    {Object.keys(info.options).map(
                      (type: string) =>
                        !emptyOptions?.includes(type) && (
                          <EqualHeightElement name={type} key={uuid4()}>
                            <div
                              className={clsx(styles.tableCell, 'tableCell')}
                            >
                              {info.options[type]
                                .filter(
                                  (option) =>
                                    !isOnlyDiff || !carOmitOptions.has(option),
                                )
                                .join(', ')}
                            </div>
                          </EqualHeightElement>
                        ),
                    )}
                    {(!isOnlyDiff || !isIdentical.colorName) && (
                      <EqualHeightElement name="color">
                        <div
                          className={clsx(
                            styles.tableCell,
                            styles.colorCell,
                            styles.lastCell,
                            'tableCell',
                          )}
                        >
                          <div
                            className={styles.colorBox}
                            style={{ backgroundColor: info.colorName }}
                          />
                          <span>{info.colorName}</span>
                        </div>
                      </EqualHeightElement>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollSyncPane>
        </div>
      </EqualHeight>
    </CollapseElement>
  );
};

export { GeneralComparisonTable };
