import { FC } from 'react';

import bmw from '@assets/images/bmw_logo.svg';
import compare_part_1 from '@assets/images/compare_part_1.svg';
import compare_part_2 from '@assets/images/compare_part_2.svg';
import heart from '@assets/images/heart.svg';
import new_car_1 from '@assets/images/mock_car_picture.png';

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
            src={compare_part_1}
            alt="compare button"
          />
          <img className={styles.compareButton} src={compare_part_2} alt="" />
        </div>
      </div>
      <img src={new_car_1} alt="car image" className={styles.carImage}></img>
      <div className={styles.cardFooter}>
        <div className={styles.carContent}>
          <p className={styles.carDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui mi
            aliquet enim ultrices ornare maecenas non enim amet...
          </p>
        </div>
        <hr className={styles.verticalLine} />
        <div className={styles.priceBox}>
          <h4 className={styles.price}>$ 34 000 - $ 52 450</h4>
        </div>
      </div>
    </div>
  );
};

export { CarCard };
