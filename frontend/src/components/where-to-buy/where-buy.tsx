import { useMemo, useState } from 'react';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { useAppSelector } from '@hooks/store/store.hooks';
import { useGetWhereBuyQuery } from '@store/queries/where-buy';

import styles from './styles.module.scss';
import { WhereBuyItem } from './where-buy/where-buy-item';

const WhereToBuy: React.FC = () => {
  const [page, setPage] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const { adverts } = useAppSelector((state) => state.whereBuy);
  const advertsList = useMemo(() => {
    if (!isSorted) return adverts;
    return [...adverts].sort((advertA, advertB) => advertA.USD - advertB.USD);
  }, [adverts, isSorted]);

  useGetWhereBuyQuery({
    page,
    complectationId: '711b75ca-e29f-49e1-bcb9-b782bfb57637',
    countpage: '20',
  });

  const seeMoreHandler = (): void => {
    setPage(page + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.carName}>
          {advertsList &&
            advertsList[0] &&
            `${advertsList[0].markName} ${advertsList[0].modelName} ${advertsList[0].autoData.year}`}
        </div>
        <ButtonOutline
          className={styles.priceButton}
          text="By Price"
          onClick={(): void => {
            setIsSorted(!isSorted);
          }}
        />
      </div>
      {advertsList &&
        advertsList.map((poster) => (
          <WhereBuyItem key={poster.autoData.autoId} poster={poster} />
        ))}
      <div className={styles.seeAll}>
        <button className={styles.moreButton} onClick={seeMoreHandler}>
          See more
        </button>
      </div>
    </div>
  );
};

export { WhereToBuy };
