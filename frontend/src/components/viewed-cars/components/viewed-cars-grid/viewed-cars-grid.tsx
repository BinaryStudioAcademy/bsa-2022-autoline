import { FC } from 'react';

import { ViewedCarDataList } from '@common/types/types';
import { ShortCarCard } from '@components/viewed-cars/components/short-car-card/short-car-card';

import styles from './style.module.scss';

const ViewedCarsGrid: FC<ViewedCarDataList> = ({ carDataList }) => {
  return (
    <div className={styles.carGrid}>
      {carDataList.list.map((item, index) => (
        <ShortCarCard carData={item} key={index} />
      ))}
    </div>
  );
};

export { ViewedCarsGrid };
