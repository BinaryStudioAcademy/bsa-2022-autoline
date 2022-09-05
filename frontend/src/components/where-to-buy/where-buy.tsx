import { useEffect, useMemo, useState } from 'react';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { useAppSelector } from '@hooks/store/store.hooks';
import { useGetWhereBuyQuery } from '@store/queries/where-buy';

import styles from './styles.module.scss';
import { WhereBuyItem } from './where-buy/where-buy-item';

const WhereToBuy: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isSorted, setIsSorted] = useState(false);
  const { adverts: list } = useAppSelector((state) => state.whereBuy);
  const advertsList = useMemo(() => {
    if (!isSorted) return list;
    return [...list].sort((advertA, advertB) => advertA.USD - advertB.USD);
  }, [list, isSorted]);

  const { data: adverts } = useGetWhereBuyQuery({
    page,
    complectationId: '711b75ca-e29f-49e1-bcb9-b782bfb57637',
  });
  const [cars, setCars] = useState(adverts);

  useEffect(() => {
    if (cars && adverts) {
      setCars([...cars, ...adverts]);
    } else if (adverts) {
      setCars([...adverts]);
    }
  }, [adverts]);

  const byPriceHandler = (): void => {
    setIsSorted(!isSorted);
    // if (cars) {
    //   const arrayForSort = [...cars];
    //   setCars([...arrayForSort.sort((a, b) => a.USD - b.USD)]);
    // }
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
      {advertsList &&
        advertsList.map((poster) => (
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
