import { FC } from 'react';

import bmw from '@assets/images/bmw_logo.svg';
import compare from '@assets/images/compare.svg';
import heart from '@assets/images/heart.svg';
import new_car_1 from '@assets/images/mock_car_picture.png';

import styles from './styles.module.scss';

const NewCarCard: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.carTitle}>
        <img className={styles.carLogo} src={bmw} alt="car logo" />
        <span className={styles.carName}>BMW X5</span>
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
          <p className={styles.carDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui mi
            aliquet aliquet aliquet enim ultrices ornare maecenas non enim
            amet...
          </p>
        </div>
        <hr className={styles.verticalLine} />
        <div className={styles.priceBox}>
          <span className={styles.price}>$ 34 000 - $ 52 450</span>
        </div>
      </div>
    </div>
  );
};

export { NewCarCard };
