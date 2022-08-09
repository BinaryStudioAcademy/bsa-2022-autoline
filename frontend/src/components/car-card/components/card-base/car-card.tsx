import { FC } from 'react';

import bmw from '@assets/images/bmw_logo.svg';
import compare from '@assets/images/compare.svg';
import heart from '@assets/images/heart.svg';
import new_car_1 from '@assets/images/mock_car_picture.png';
import { CarDescription } from '@components/car-card/components/card-description/car-description';

import styles from './styles.module.scss';

const CarCard: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.carTitle}>
        <img className={styles.carLogo} src={bmw} alt="car logo" />
        <h2 className={styles.carName}>BMW X5</h2>
      </div>
      <div className={styles.buttonsWrapper}>
        <img className={styles.likeButton} src={heart} alt="like button" />
        <div className={styles.compareButtonsWrapper}>
          <img
            className={styles.compareButton}
            src={compare}
            alt="compare button"
          />
        </div>
      </div>
      <img src={new_car_1} alt="car image" className={styles.carImage}></img>
      <div className={styles.cardFooter}>
        <div className={styles.carContent}>
          <CarDescription />
        </div>
        <hr className={styles.verticalLine} />
        <div className={styles.priceBox}>
          <span className={styles.price}>$ 34 000 - $ 52 450</span>
        </div>
      </div>
    </div>
  );
};

export { CarCard };
