import { useState } from 'react';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { TrashCanIcon } from '@components/common/icons/trash-can/trash-can';
import { Spinner } from '@components/common/spinner/spinner';
import {
  useClearComparisonMutation,
  useGetComparisonsPreviewCarsQuery,
} from '@store/queries/comparisons';
import { clsx } from 'clsx';

import { DragAndDrop } from './components/drag-and-drop';
import styles from './components/styles.module.scss';

export const CompTopTableBar = (): React.ReactElement => {
  const { data, isLoading } = useGetComparisonsPreviewCarsQuery();
  const [clearTable] = useClearComparisonMutation();
  const [isCleared, setIsCleared] = useState(false);

  const cars = data?.slice().sort((a, b) => a.position - b.position);
  const ids = cars?.map((car) => car.id);

  const handleClearTable = async (): Promise<void> => {
    await clearTable();
  };

  const handleClearBtnClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    setIsCleared(true);
    handleClearTable();
  };

  const initialData = {
    cars,
    columns: [
      {
        id: '0',
        carsIds: ids,
      },
    ],
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
      {!isCleared && <DragAndDrop initialData={initialData} />}
    </div>
  );
};
