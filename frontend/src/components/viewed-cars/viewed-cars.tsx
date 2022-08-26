import { FC, useState } from 'react';

import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ViewedCarsGrid } from '@components/viewed-cars/components/viewed-cars-grid/viewed-cars-grid';
import { useGetHistoryOfViwedCarsQuery } from '@store/queries/history-viewed-cars';

import styles from './styles.module.scss';

import type { GetViewedCarsResponse } from '@autoline/shared';

const ViewedCars: FC = () => {
  const [takeCars, setTakeCars] = useState(6);

  const params = {
    userId: '0cdfe5ca-256f-49e4-855f-f438a4fac3c9',
    skip: '0',
    take: String(takeCars),
  };

  const { data, isLoading } = useGetHistoryOfViwedCarsQuery(params);

  const getMoreCars = async (): Promise<void> => {
    setTakeCars(takeCars + 30);
  };

  const isAllData = takeCars >= Number(data?.count);

  return (
    <article className={styles.ViewedСars}>
      <h3 className={styles.ViewedСarsTitle}>revised</h3>
      {isLoading ? null : (
        <ViewedCarsGrid carDataList={data as GetViewedCarsResponse} />
      )}
      {isAllData ? null : (
        <ButtonFill
          onClick={getMoreCars}
          text="load more"
          className={styles.ViewedСarsBtn}
        />
      )}
    </article>
  );
};

export { ViewedCars };
