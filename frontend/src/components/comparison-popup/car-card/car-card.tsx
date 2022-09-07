import { FC } from 'react';

import carImg from '@assets/images/mock_car_picture.png';
import trashIcon from '@assets/images/trash.svg';

import styles from './styles.module.scss';

const CarCard: FC = () => {
  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={carImg} alt="car image" />
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>BMW X5 M Packet 40d 2015</p>
        <p className={styles.cardPrice}>$ 34 000 - 52 450</p>
      </div>
      <span className={styles.cardRemove}>
        <img src={trashIcon} alt="delete icon" />
      </span>
    </div>
  );
};

export { CarCard };
