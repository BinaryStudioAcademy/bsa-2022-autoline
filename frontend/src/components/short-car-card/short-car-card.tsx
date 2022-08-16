import { FC } from 'react';

import { CarDataPropsType } from '@common/types/card/card';

import styles from './styles.module.scss';

const ShortCarCard: FC<CarDataPropsType> = ({ carData }) => {
  const { photo_url, title, price } = carData;
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={photo_url} alt="car" />
      </div>
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.cardPrice}>{price}</p>
    </div>
  );
};

export { ShortCarCard };
