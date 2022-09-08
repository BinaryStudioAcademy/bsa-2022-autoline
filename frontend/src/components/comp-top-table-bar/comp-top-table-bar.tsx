import { useEffect, useRef, useState } from 'react';

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
  const ref = useRef<HTMLInputElement>();

  const cars = data?.slice().sort((a, b) => a.position - b.position);
  const ids = cars?.map((car) => car.id);
  const initialData = {
    cars,
    carsPositions: ids,
  };

  const handleClearTable = async (): Promise<void> => {
    await clearTable();
  };

  const handleClearBtnClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    setIsCleared(true);
    handleClearTable();
  };

  useEffect(() => {
    addEventListener(
      'wheel',
      () => {
        const currentElement = ref.current;
        if (currentElement) {
          const onWheel = (e: WheelEvent): void => {
            if (e.deltaY == 0) return;
            e.preventDefault();
            currentElement.scrollTo({
              left: currentElement.scrollLeft + 5 * e.deltaY,
              behavior: 'smooth',
            });
          };
          currentElement.addEventListener('wheel', onWheel);
          return (): void =>
            currentElement.removeEventListener('wheel', onWheel);
        }
      },
      { passive: false },
    );
  });

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
      <div
        className={styles.slider}
        ref={ref as React.RefObject<HTMLInputElement>}
      >
        {!isCleared ? (
          ((): React.ReactElement => {
            let cars;
            const fetchedData = initialData.cars;
            if (fetchedData) {
              cars = initialData.carsPositions?.map((carId) => {
                const index = fetchedData.findIndex((car) => car.id === carId);
                return fetchedData[index];
              });
            } else {
              cars = undefined;
            }

            return (
              <Comparison cars={cars} positions={initialData.carsPositions} />
            );
          })()
        ) : (
          <NoActiveComparison />
        )}
      </div>
    </div>
  );
};
