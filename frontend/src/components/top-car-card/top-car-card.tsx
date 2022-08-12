import { FC } from 'react';

import bmw from '@assets/images/bmw_logo.svg';
import compare from '@assets/images/compare.svg';
import fuel from '@assets/images/fuel.svg';
import heart from '@assets/images/heart.svg';
import mapPin from '@assets/images/map-pin.svg';
import carPicture from '@assets/images/mock_car_picture.png';
import speedometr from '@assets/images/speedometr.svg';
import transmission from '@assets/images/transmission.svg';

import styles from './styles.module.scss';

const TopCarCard: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.carInfo}>
          <img className={styles.carLogo} src={bmw} alt="car logo" />
          <span className={styles.carName}>BMW X5 xDrive AWT 2015</span>
        </div>
        <div className={styles.iconGroup}>
          <img className={styles.icon} src={heart} alt="like" />
          <img className={styles.icon} src={compare} alt="compare" />
        </div>
      </div>
      <img src={carPicture} className={styles.carPicture} alt="car picture" />
      <div className={styles.footer}>
        <div className={styles.labelGroup}>
          <div>
            <div className={styles.label}>
              <img src={speedometr} alt="speedometr" />
              140 000 km
            </div>
            <div className={styles.label}>
              <img src={transmission} alt="transmission" />
              Automaton
            </div>
          </div>
          <div>
            <div className={styles.label}>
              <img src={mapPin} alt="location" />
              Kyiv
            </div>
            <div className={styles.label}>
              <img src={fuel} alt="fuel" />
              Diesel
            </div>
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.price}>$ 34 000</div>
      </div>
    </div>
  );
};

export { TopCarCard };
