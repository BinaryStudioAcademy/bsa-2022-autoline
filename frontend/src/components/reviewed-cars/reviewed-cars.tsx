import { FC } from 'react';

import photo_url from '@assets/images/mock_car_picture.png';
import { ReviewedCarsGrid } from '@components/reviewed-cars-grid/reviewed-cars-grid';

import styles from './styles.module.scss';

const ReviewedCars: FC = () => {
  // mock data
  const carData = {
    photo_url,
    title: 'BMW X5 M Packet 40d 2015',
    price: '$ 34 000 - 52 450',
  };

  const dataArray = [...Array(8)].map((_) => carData);

  const listIsEmpty = dataArray.length === 0;

  const Message: FC = () => (
    <p className={styles.messageWrapper}>the list is empty</p>
  );

  return (
    <article className={styles.cars}>
      <h2 className={styles.carsTitle}>revised</h2>
      {listIsEmpty ? <Message /> : <ReviewedCarsGrid carDataList={dataArray} />}
    </article>
  );
};

export { ReviewedCars };
