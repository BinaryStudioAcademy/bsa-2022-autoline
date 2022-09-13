import { useEffect, useMemo } from 'react';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';
import { ScrollSyncPane } from 'react-scroll-sync';

import { CollapseElement } from '@components/collapse-component/collapse-element/collapse-element';
import { Spinner } from '@components/common/spinner/spinner';
import { uuid4 } from '@sentry/utils';
import { useGetComparisonGeneralInfoQuery } from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const GeneralComparisonTable: React.FC = () => {
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

  const broadcast = new BroadcastChannel('compare');
  useEffect(() => {
    broadcast.onmessage = (): void => {
      refetch();
    };
  }, [broadcast, refetch]);

  if (isLoading) return <Spinner />;

  return (
    <CollapseElement label="General information" isOpen={true}>
      <EqualHeight>
        <div className={styles.table}>
          <div className={clsx(styles.tableTitles, styles.tableColumn)}>
            <EqualHeightElement name="bodytype">
              <div className={styles.tableCell}>Type</div>
            </EqualHeightElement>
            <EqualHeightElement name="motor">
              <div className={styles.tableCell}>Motor</div>
            </EqualHeightElement>
            <EqualHeightElement name="enginepower">
              <div className={styles.tableCell}>Engine Power</div>
            </EqualHeightElement>
            <EqualHeightElement name="engine">
              <div className={styles.tableCell}>Engine</div>
            </EqualHeightElement>
            <EqualHeightElement name="wheeldrive">
              <div className={styles.tableCell}>Wheel Drive</div>
            </EqualHeightElement>
            {[...options].map((option) => (
              <EqualHeightElement name={option}>
                <div
                  className={styles.tableCell}
                  data-optiontitle={option}
                  key={uuid4()}
                >
                  {option}
                </div>
              </EqualHeightElement>
            ))}
            <EqualHeightElement name="color">
              <div className={clsx(styles.tableCell, styles.lastCell)}>
                Color
              </div>
            </EqualHeightElement>
          </div>
          <ScrollSyncPane>
            <div className={clsx('styledScrollbar', styles.generalInfo)}>
              {generalInfo?.map((info) => {
                return (
                  <div
                    className={clsx(styles.tableData, styles.tableColumn)}
                    key={info.id}
                  >
                    <EqualHeightElement name="bodytype">
                      <div className={styles.tableCell}>{info.bodyType}</div>
                    </EqualHeightElement>
                    <EqualHeightElement name="motor">
                      <div className={styles.tableCell}>
                        {info.engineDisplacement} l.
                      </div>
                    </EqualHeightElement>
                    <EqualHeightElement name="enginepower">
                      <div className={styles.tableCell}>
                        {info.enginePower} h.p.
                      </div>
                    </EqualHeightElement>
                    <EqualHeightElement name="engine">
                      <div className={styles.tableCell}>{info.engine}</div>
                    </EqualHeightElement>
                    <EqualHeightElement name="wheeldrive">
                      <div className={styles.tableCell}>
                        {info.drivetrainName}
                      </div>
                    </EqualHeightElement>
                    {Object.keys(info.options).map((type: string) => (
                      <EqualHeightElement name={type} key={uuid4()}>
                        <div className={styles.tableCell}>
                          {info.options[type].join(', ')}
                        </div>
                      </EqualHeightElement>
                    ))}
                    <EqualHeightElement name="color">
                      <div
                        className={clsx(
                          styles.tableCell,
                          styles.colorCell,
                          styles.lastCell,
                        )}
                      >
                        <div
                          className={styles.colorBox}
                          style={{ backgroundColor: info.colorName }}
                        />
                        <span>{info.colorName}</span>
                      </div>
                    </EqualHeightElement>
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
