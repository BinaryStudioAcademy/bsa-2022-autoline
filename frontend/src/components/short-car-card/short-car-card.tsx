import { FC } from 'react';

import { CarDataPropsType } from '@common/types/card/card';

import styles from './styles.module.scss';

const ShortCarCard: FC<CarDataPropsType> = ({ carData }) => {
  const { photo_url, title, price } = carData;
  return (
    <div className={styles.container}>
      <div className={styles.carPicture}>
        <img src={photo_url} alt="car" />
      </div>
      <p className={styles.carName}>{title}</p>
      <p className={styles.price}>{price}</p>
    </div>
  );
};

export { ShortCarCard };
