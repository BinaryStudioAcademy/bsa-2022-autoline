import { useEffect, useState } from 'react';

// import { WhereBuyItemProps } from '@common/types/where-to-buy/where-to-buy';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import Divider from '@mui/material/Divider';
import { useGetWhereBuyQuery } from '@store/queries/where-buy';

import styles from './styles.module.scss';
import { WhereBuyItem } from './where-buy/where-buy-component';

const WhereToBuy: React.FC = () => {
  const { data: posters, isSuccess } = useGetWhereBuyQuery({
    page: 1,
    complectationId: '711b75ca-e29f-49e1-bcb9-b782bfb57637',
  });
  const [cars, setCars] = useState(posters);

  useEffect(() => {
    setCars(posters);
  }, [isSuccess]);

  const byPriceHandler = (): void => {
    if (posters) {
      const arrayForSort = [...posters];
      setCars([...arrayForSort.sort((a, b) => a.USD - b.USD)]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.carName}>bmw x5 m packet 40d 2015</div>
        <ButtonOutline
          className={styles.priceButton}
          text="By Price"
          onClick={byPriceHandler}
        />
      </div>
      {cars &&
        cars.map((poster) => (
          <>
            <WhereBuyItem
              key={poster.autoData.autoId}
              id={String(poster.autoData.autoId)}
              carName={`${poster.markName} ${poster.modelName} ${poster.autoData.year}`}
              url={`https://auto.ria.com/uk${poster.linkToView}`}
              price={poster.USD}
              description={poster.autoData.description}
            />
            <div className={styles.dividerDiv}>
              <Divider className={styles.divider} />
            </div>
          </>
        ))}
      <div className={styles.seeAll}>
        <button className={styles.moreButton}>See All 10</button>
      </div>
    </div>
  );
};

export { WhereToBuy };
