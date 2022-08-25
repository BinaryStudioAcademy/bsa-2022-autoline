import { FC, useState } from 'react';

import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ViewedCarsGrid } from '@components/viewed-cars/components/viewed-cars-grid/viewed-cars-grid';
import { useGetHistoryOfViwedCarsQuery } from '@store/queries/history-viewed-cars';

import styles from './styles.module.scss';

import type { GetViewedCarsResponse } from '@autoline/shared';

const ViewedCars: FC = () => {
  const [params, setParams] = useState({
    userId: '0cdfe5ca-256f-49e4-855f-f438a4fac3c9',
    skip: '0',
    take: '8',
  });

  const { data, isLoading } = useGetHistoryOfViwedCarsQuery(params);

  const getMoreCars = async (): Promise<void> => {
    setParams((state) => ({
      ...state,
      skip: String(+state.skip + +state.take),
      take: String(+state.take + 30),
    }));
  };

  const isAllData = +params.skip + +params.take >= Number(data?.count);

  return (
    <article className={styles.ViewedСars}>
      <h4 className={styles.ViewedСarsTitle}>history of viewed cars</h4>
      {isLoading || data?.count === 0 ? null : (
        <>
          <ViewedCarsGrid carDataList={data as GetViewedCarsResponse} />
          <ButtonFill
            onClick={getMoreCars}
            text="LOAD MORE"
            className={
              isAllData ? styles.VisibilityHidden : styles.ViewedСarsBtn
            }
          />
        </>
      )}
      {data?.count === 0 && (
        <p className={styles.ViewedСarsText}>
          Nothing in the list of viewed cars.
        </p>
      )}
    </article>
  );
};

export { ViewedCars };