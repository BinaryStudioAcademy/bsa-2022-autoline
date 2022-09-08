import { useMemo, useState } from 'react';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { useAppSelector } from '@hooks/store/store.hooks';
import SearchIcon from '@mui/icons-material/Search';
import { useGetWhereBuyQuery } from '@store/queries/where-buy';
import { clsx } from 'clsx';

import styles from './styles.module.scss';
import { WhereBuyItem } from './where-buy-item/where-buy-item';

interface WhereToBuyProps {
  complectationId: string;
}

const WhereToBuy: React.FC<WhereToBuyProps> = ({ complectationId }) => {
  const [page, setPage] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const countpage = 20;
  useGetWhereBuyQuery({
    page,
    complectationId,
    countpage,
  });

  const { adverts } = useAppSelector((state) => state.whereBuy);

  const advertsList = useMemo(() => {
    if (!isSorted) return adverts;
    return [...adverts].sort((advertA, advertB) => advertA.USD - advertB.USD);
  }, [adverts, isSorted]);

  const seeMoreHandler = (): void => {
    setPage(page + 1);
  };

  if (!adverts.length) {
    return (
      <div className={styles.noFoundContainer}>
        <SearchIcon className={clsx(styles.searchIcon, styles.icon)} />
        <h3 className={styles.mg0}>No adverts found</h3>
      </div>
    );
  }
  const name = `${advertsList[0].markName} ${advertsList[0].modelName}`;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.carName}>{name}</div>
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
