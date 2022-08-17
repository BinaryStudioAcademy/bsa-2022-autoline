import { FC } from 'react';

import { CarDataListPropsType } from '@common/types/types';
import { ShortCarCard } from '@components/short-car-card/short-car-card';

import styles from './style.module.scss';

const ReviewedCarsGrid: FC<CarDataListPropsType> = ({ carDataList }) => {
  return (
    <div className={styles.carGrid}>
      {carDataList.map((item, index) => (
        <ShortCarCard carData={item} key={index} />
      ))}
    </div>
  );
};

export { ReviewedCarsGrid };
