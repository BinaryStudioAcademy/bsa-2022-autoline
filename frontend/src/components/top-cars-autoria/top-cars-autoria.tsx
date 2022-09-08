import { topCars } from '@components/landing-page/mock-top-cars';
import { TopCarCard } from '@components/top-car-card/top-car-card';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const TopCarsAutoria: React.FC<{ cardsContainerClassName?: string }> = ({
  cardsContainerClassName,
}) => (
  <div className={styles.topAutoriaContainer}>
    <div className={styles.topAutoriaHeader}>Top Autoria</div>
    <div className={clsx(styles.topAutoriaCards, cardsContainerClassName)}>
      {topCars.map((car) => (
        <TopCarCard car={car} key={car.id} />
      ))}
    </div>
  </div>
);

export { TopCarsAutoria };
