import { FC } from 'react';

// import bmw from '@assets/images/bmw_logo.svg';
import compare from '@assets/images/compare.svg';
import fuel from '@assets/images/fuel.svg';
import heart from '@assets/images/heart.svg';
import mapPin from '@assets/images/map-pin.svg';
// import carPicture from '@assets/images/mock_car_picture.png';
import speedometr from '@assets/images/speedometr.svg';
import transmission from '@assets/images/transmission.svg';
import { TopCars } from '@components/landing-page/mock-top-cars';

import styles from './styles.module.scss';

interface TopCarProps {
  car: TopCars;
}

const TopCarCard: FC<TopCarProps> = ({ car }) => {
  const name = `${car.brand.name} ${car.name}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.carInfo}>
          <img
            className={styles.carLogo}
            src={car.brand.logoUrl}
            alt="car logo"
          />
          <span className={styles.carName}>{name}</span>
        </div>
        <div className={styles.iconGroup}>
          <img className={styles.icon} src={heart} alt="like" />
          <img className={styles.icon} src={compare} alt="compare" />
        </div>
      </div>
      <img
        src={car.photoUrls[0]}
        className={styles.carPicture}
        alt="car picture"
      />
      <div className={styles.footer}>
        <div className={styles.labelGroup}>
          <div>
            <div className={styles.label}>
              <img src={speedometr} alt="speedometr" />
              {`${car.speedometr} km`}
            </div>
            <div className={styles.label}>
              <img src={transmission} alt="transmission" />
              {car.transmission}
            </div>
          </div>
          <div>
            <div className={styles.label}>
              <img src={mapPin} alt="location" />
              {car.location}
            </div>
            <div className={styles.label}>
              <img src={fuel} alt="fuel" />
              {car.fuel}
            </div>
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.price}>{`$ ${car.price}`}</div>
      </div>
    </div>
  );
};

export { TopCarCard };
