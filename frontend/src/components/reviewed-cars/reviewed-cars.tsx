import car from '@assets/images/mock_car_picture.png';
import { ShortCarCard } from '@components/short-car-card/short-car-card';

import styles from './styles.module.scss';

const ReviewedCars = (): JSX.Element => {
  // mock data
  const carData = {
    src: car,
    title: 'BMW X5 M Packet 40d 2015',
    price: '$ 34 000 - 52 450',
  };

  return (
    <article className={styles.cars}>
      <h2 className={styles.carsTitle}>revised</h2>
      <div className={styles.carsGrid}>
        {[...Array(16)].map((_, index) => (
          <ShortCarCard carData={carData} key={index} />
        ))}
      </div>
    </article>
  );
};

export { ReviewedCars };
