import { useMemo, useState } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { TrashCanIcon } from '@components/common/icons/trash-can/trash-can';
import { Spinner } from '@components/common/spinner/spinner';
import {
  useClearComparisonMutation,
  useGetComparisonCarsQuery,
} from '@store/queries/comparisons';
import { clsx } from 'clsx';

import { Comparison } from './components/comparison';
import { NoActiveComparison } from './components/no-active-comparison';
import styles from './components/styles.module.scss';

export const CompTopTableBar = (): React.ReactElement => {
  const { data, isLoading } = useGetComparisonCarsQuery();
  const [clearTable] = useClearComparisonMutation();
  const [isCleared, setIsCleared] = useState(false);

  const carsIds = useMemo(() => {
    return data?.map((car) => car.id);
  }, [data]);

  const handleClearTable = async (): Promise<void> => {
    await clearTable();
  };

  const handleClearBtnClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    setIsCleared(true);
    handleClearTable();
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnContainer}>
        <ButtonOutline
          text="+Add to Comparison"
          className={styles.btnOutline}
        />
        <div className={styles.clearBtn} onClick={handleClearBtnClick}>
          <button className={clsx(styles.button, styles.iconButton)}>
            <TrashCanIcon />
          </button>
          <div className={styles.clearBtnText}>Clear the Table</div>
        </div>
      </div>
      <ScrollSyncPane>
        <div className={styles.slider}>
          {!isCleared ? (
            <Comparison cars={data} positions={carsIds} />
          ) : (
            <NoActiveComparison />
          )}
        </div>
      </ScrollSyncPane>
    </div>
  );
};
