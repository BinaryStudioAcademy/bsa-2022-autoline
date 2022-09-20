import { Spinner } from '@components/common/spinner/spinner';
import { TopCarCard } from '@components/top-car-card/top-car-card';
import { useGetTopAutolineQuery } from '@store/queries/top-autoline';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const TopCarsAutoline: React.FC<{ cardsContainerClassName?: string }> = ({
  cardsContainerClassName,
}) => {
  const { data, isLoading } = useGetTopAutolineQuery();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.topAutoriaContainer}>
      <div className={styles.topAutoriaHeader}>Top Autoline</div>
      <div className={clsx(styles.topAutoriaCards, cardsContainerClassName)}>
        {data?.map((car) => (
          <TopCarCard car={car} key={car.id} />
        ))}
      </div>
    </div>
  );
};

export { TopCarsAutoline };
