import { useMemo, useState } from 'react';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { useAppSelector } from '@hooks/store/store.hooks';
import SearchIcon from '@mui/icons-material/Search';
import { useGetWhereBuyQuery } from '@store/queries/where-buy';
import { clsx } from 'clsx';

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
  console.log(adverts[0]);
  useGetWhereBuyQuery({
    page,
    complectationId: '711b75ca-e29f-49e1-bcb9-b782bfb57637',
    countpage: '20',
  });

  const seeMoreHandler = (): void => {
    setPage(page + 1);
  };

  if (!adverts.length) {
    return (
      <div className={styles.noFoundContainer}>
        <SearchIcon className={clsx(styles.searchIcon, styles.icon)} />
        <h3 className={styles.noAdvertsTitle}>No adverts found</h3>
      </div>
    );
  }

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
