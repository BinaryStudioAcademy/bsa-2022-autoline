import { FC } from 'react';

import fuel from '@assets/images/fuel.svg';
import mapPin from '@assets/images/map-pin.svg';
import speedometr from '@assets/images/speedometr.svg';
import transmission from '@assets/images/transmission.svg';
import { TopCar } from '@autoline/shared';
import { formatPrice } from '@helpers/helpers';

import styles from './styles.module.scss';

interface TopCarProps {
  car: TopCar;
}

const TopCarCard: FC<TopCarProps> = ({ car }) => {
  const {
    race,
    transmission: transmiss,
    location,
    fuelType,
    price: totalPrice,
    name,
    brand,
    photoUrl,
    url,
  } = car;
  const fullName = `${brand.name} ${name}`;

  const handleClick = (): void => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.header}>
        <div className={styles.carInfo}>
          <img className={styles.carLogo} src={brand.logoUrl} alt="car logo" />
          <span className={styles.carName}>{fullName}</span>
        </div>
      </div>
      <img src={photoUrl} className={styles.carPicture} alt="car picture" />
      <div className={styles.footer}>
        <div className={styles.labelGroup}>
          <div className={styles.label}>
            <img src={speedometr} alt="speedometr" />
            {`${race} 000 km`}
          </div>
          <div className={styles.label}>
            <img src={mapPin} alt="location" />
            {location}
          </div>
          <div className={styles.label}>
            <img src={transmission} alt="transmission" />
            {transmiss}
          </div>
          <div className={styles.label}>
            <img src={fuel} alt="fuel" />
            {fuelType}
          </div>
        </div>

        <div className={styles.price}>
          <hr className={styles.separator} />
          <span className={styles.priceText}>{`${formatPrice(
            totalPrice,
          )}`}</span>
        </div>
      </div>
    </div>
  );
};

export { TopCarCard };
