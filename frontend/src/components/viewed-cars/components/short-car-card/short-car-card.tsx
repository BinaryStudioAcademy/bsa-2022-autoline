import { FC } from 'react';

import { ViewedCarData } from '@common/types/types';

import styles from './styles.module.scss';

const ShortCarCard: FC<ViewedCarData> = ({ carData }) => {
  const { brand, model, complectation, year, photo_urls, price } = carData;
  const carName = `${brand} ${model} ${complectation} ${year}`;
  return (
    <div className={styles.container}>
      <div className={styles.carPicture}>
        <img src={photo_urls[0]} alt="car" />
      </div>
      <p className={styles.carName}>{carName}</p>
      <p className={styles.price}>{price}</p>
    </div>
  );
};

export { ShortCarCard };
