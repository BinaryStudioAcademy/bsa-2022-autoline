import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { useGetWhereBuyQuery } from '@store/queries/where-buy';

import styles from './styles.module.scss';
import { WhereBuyItem } from './where-buy/where-buy-item';

const WhereToBuy: React.FC = () => {
  const [page, setPage] = useState(1);
  // const dispatch = useDispatch();

  const { data: posters } = useGetWhereBuyQuery({
    page,
    complectationId: '711b75ca-e29f-49e1-bcb9-b782bfb57637',
  });
  const [cars, setCars] = useState(posters);

  useEffect(() => {
    if (cars && posters) {
      setCars([...cars, ...posters]);
    } else if (posters) {
      setCars([...posters]);
    }
  }, [posters]);

  const byPriceHandler = (): void => {
    if (cars) {
      const arrayForSort = [...cars];
      setCars([...arrayForSort.sort((a, b) => a.USD - b.USD)]);
    }
  };

  const seMoreHandler = (): void => {
    setPage(page + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.carName}>
          {cars &&
            cars[0] &&
            `${cars[0].markName} ${cars[0].modelName} ${cars[0].autoData.year}`}
        </div>
        <ButtonOutline
          className={styles.priceButton}
          text="By Price"
          onClick={byPriceHandler}
        />
      </div>
      {cars &&
        cars.map((poster) => (
          <WhereBuyItem key={poster.autoData.autoId} poster={poster} />
        ))}
      <div className={styles.seeAll}>
        <button className={styles.moreButton} onClick={seMoreHandler}>
          See more
        </button>
      </div>
    </div>
  );
};

export { WhereToBuy };
