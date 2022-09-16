import { useEffect, useMemo, Dispatch } from 'react';
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

interface CompTopTableBarProps {
  setPopupState: Dispatch<boolean>;
}

export const CompTopTableBar = ({
  setPopupState,
}: CompTopTableBarProps): React.ReactElement => {
  const { data: initialData, isLoading, refetch } = useGetComparisonCarsQuery();
  const [clearTable] = useClearComparisonMutation();

  const carsIds = useMemo(() => {
    return initialData?.map((car) => car.id);
  }, [initialData]);

  const handleClearTable = async (): Promise<void> => {
    await clearTable();
  };

  const handleClearBtnClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    handleClearTable();
  };

  useEffect(() => {
    const broadcast = new BroadcastChannel('compare');
    broadcast.onmessage = (): void => {
      refetch();
    };
  }, [refetch]);

  const handleAddToComparison = (): void => {
    setPopupState(true);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnContainer}>
        <ButtonOutline
          onClick={handleAddToComparison}
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
          {initialData?.length ? (
            <Comparison cars={initialData} positions={carsIds} />
          ) : (
            <NoActiveComparison />
          )}
        </div>
      </ScrollSyncPane>
    </div>
  );
};
