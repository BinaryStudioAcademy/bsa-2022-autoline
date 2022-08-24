import { FC } from 'react';

import compare from '@assets/images/compare.svg';
import heart from '@assets/images/heart.svg';
import { NewCarsBrand } from '@autoline/shared/common/types/types';

import styles from './styles.module.scss';

interface NewCarsProps {
  newCar: NewCarsBrand;
}

const NewCarCard: FC<NewCarsProps> = ({ newCar }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.carTitle}>
        <img className={styles.carLogo} src={newCar.logo_url} alt="car logo" />
        <span className={styles.carName}>{newCar.name}</span>
      </div>
      <div className={styles.buttonsWrapper}>
        <img className={styles.button} src={heart} alt="like button" />
        <img className={styles.button} src={compare} alt="compare button" />
      </div>
      <img
        src={newCar.photo_urls[0]}
        alt="car image"
        className={styles.carImage}
      ></img>
      <div className={styles.cardFooter}>
        <div className={styles.carContent}>
          <p className={styles.carDescription}>{newCar.description} </p>
        </div>
        <hr className={styles.verticalLine} />
        <div className={styles.priceBox}>
          <span className={styles.price}>
            $ {newCar.price_start.toLocaleString('ua')} -<br /> {'$ '}
            {newCar.price_end.toLocaleString('ua')}
          </span>
        </div>
      </div>
    </div>
  );
};

export { NewCarCard };
