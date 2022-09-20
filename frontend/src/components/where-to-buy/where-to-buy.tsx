import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@hooks/store/store.hooks';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { useGetWhereBuyQuery } from '@store/queries/where-buy';
import { setPage } from '@store/root-reducer';
import { clsx } from 'clsx';

import styles from './styles.module.scss';
import { WhereBuyItem } from './where-buy-item/where-buy-item';

interface WhereToBuyProps {
  complectationId: string;
  modelId: string;
}

const WhereToBuy: React.FC<WhereToBuyProps> = ({
  complectationId,
  modelId,
}) => {
  const dispatch = useDispatch();
  const [isSorted, setIsSorted] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const { ads } = useAppSelector((state) => state.whereBuy);
  const savedPage = ads.find(
    (ad) => ad.complectationId === complectationId,
  )?.page;
  const page = savedPage ? savedPage : 0;
  const countpage = 20;

  useGetWhereBuyQuery({
    page,
    complectationId,
    countpage,
  });
  const adverts = ads.find(
    (ad) => ad.complectationId === complectationId,
  )?.adverts;
  const totalAdsCount = ads.find(
    (ad) => ad.complectationId === complectationId,
  )?.count;
  useEffect(() => {
    const countShowedAdverts = adverts?.length ? adverts?.length : 0;
    if (totalAdsCount && totalAdsCount === countShowedAdverts) {
      setShowSeeMore(false);
    } else {
      setShowSeeMore(true);
    }
  }, [totalAdsCount, adverts]);

  const advertsList = useMemo(() => {
    if (!adverts) return [];
    if (!isSorted) return [...adverts];
    return [...adverts].sort((advertA, advertB) => advertA.USD - advertB.USD);
  }, [adverts, isSorted, complectationId]);

  const seeMoreHandler = (): void => {
    dispatch(setPage({ complectationId }));
  };

  if (!advertsList || !advertsList.length) {
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
        <div className={styles.priceDiv}>
          <button
            className={styles.priceButton}
            onClick={(): void => {
              setIsSorted(!isSorted);
            }}
          >
            By Price{' '}
            {isSorted ? (
              <ExpandMoreIcon color="primary" />
            ) : (
              <ExpandLessIcon color="primary" />
            )}
          </button>
        </div>
      </div>
      {advertsList &&
        advertsList.map((poster) => (
          <WhereBuyItem
            key={poster.autoData.autoId}
            poster={poster}
            modelId={modelId}
          />
        ))}
      {showSeeMore ? (
        <div className={styles.seeAll}>
          <button className={styles.moreButton} onClick={seeMoreHandler}>
            See more
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { WhereToBuy };
