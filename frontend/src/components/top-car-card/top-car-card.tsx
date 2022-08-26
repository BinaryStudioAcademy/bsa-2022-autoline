import { FC } from 'react';

import compare from '@assets/images/compare.svg';
import fuel from '@assets/images/fuel.svg';
import heart from '@assets/images/heart.svg';
import mapPin from '@assets/images/map-pin.svg';
import speedometr from '@assets/images/speedometr.svg';
import transmission from '@assets/images/transmission.svg';
import { TopCarsMockData } from '@common/types/types';

import styles from './styles.module.scss';

interface TopCarProps {
  car: TopCarsMockData;
}

const TopCarCard: FC<TopCarProps> = ({ car }) => {
  const {
    speedometr: speed,
    transmission: transmiss,
    location,
    fuel: fuelType,
    price: totalPrice,
    name,
    brand,
    photoUrls,
  } = car;
  const fullName = `${brand.name} ${name}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.carInfo}>
          <img
            className={styles.carLogo}
            src={car.brand.logoUrl}
            alt="car logo"
          />
          <span className={styles.carName}>{fullName}</span>
        </div>
        <div className={styles.iconGroup}>
          <img className={styles.icon} src={heart} alt="like" />
          <img className={styles.icon} src={compare} alt="compare" />
        </div>
      </div>
      <img src={photoUrls[0]} className={styles.carPicture} alt="car picture" />
      <div className={styles.footer}>
        <div className={styles.labelGroup}>
          <div>
            <div className={styles.label}>
              <img src={speedometr} alt="speedometr" />
              {`${speed} km`}
            </div>
            <div className={styles.label}>
              <img src={transmission} alt="transmission" />
              {transmiss}
            </div>
          </div>
          <div>
            <div className={styles.label}>
              <img src={mapPin} alt="location" />
              {location}
            </div>
            <div className={styles.label}>
              <img src={fuel} alt="fuel" />
              {fuelType}
            </div>
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.price}>{`$ ${totalPrice}`}</div>
      </div>
    </div>
  );
};

export { TopCarCard };
