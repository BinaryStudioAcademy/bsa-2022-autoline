import { CarDataType } from '@common/types/card/card';
import { ComponentType } from '@common/types/types';

import styles from './styles.module.scss';

const ShortCarCard: ComponentType<{ carData: CarDataType }> = ({ carData }) => {
  const { src, title, price } = carData;
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={src} alt="car" />
      </div>
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.cardPrice}>{price}</p>
    </div>
  );
};

export { ShortCarCard };
