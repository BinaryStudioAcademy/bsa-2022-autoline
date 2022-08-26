import { FC, useState } from 'react';

import { ViewedCarsResponse } from '@common/types/types';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ViewedCarsGrid } from '@components/viewed-cars-grid/viewed-cars-grid';
import { useGetHistoryOfViwedCarsQuery } from '@store/queries/history-viewed-cars';

import styles from './styles.module.scss';

const ViewedCars: FC = () => {
  const [takeCars, setTakeCars] = useState(6);

  const params = {
    userId: '0cdfe5ca-256f-49e4-855f-f438a4fac3c9',
    skip: '0',
    take: String(takeCars),
  };

  const getMoreCars = (): void => {
    setTakeCars(takeCars + 30);
  };

  const { data, isLoading } = useGetHistoryOfViwedCarsQuery(params);
  const isAllData = takeCars >= Number(data?.count);

  return (
    <article className={styles.ViewedСars}>
      <h2 className={styles.ViewedСarsTitle}>revised</h2>
      {isLoading ? null : (
        <ViewedCarsGrid carDataList={data as ViewedCarsResponse} />
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
