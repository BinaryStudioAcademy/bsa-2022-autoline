import { useState } from 'react';

import { WhereBuyItemProps } from '@common/types/where-to-buy/where-to-buy';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import Divider from '@mui/material/Divider';
import { useGetWhereBuyQuery } from '@store/queries/where-buy';

import { mockValue } from './mock-value';
import styles from './styles.module.scss';
import { WhereBuyItem } from './where-buy/where-buy-component';

const WhereToBuy: React.FC = () => {
  const [cars, setCars] = useState<WhereBuyItemProps[]>(mockValue);
  const { data } = useGetWhereBuyQuery({
    page: 1,
    complectationId: '711b75ca-e29f-49e1-bcb9-b782bfb57637',
  });
  console.log(data);
  const byPriceHandler = (): void => {
    setCars([...mockValue.sort((a, b) => a.price - b.price)]);
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
      {cars.map((car) => (
        <>
          <WhereBuyItem
            key={car.id}
            id={car.id}
            carName={car.carName}
            url={car.url}
            price={car.price}
          />
          <div className={styles.dividerDiv} key={car.price}>
            <Divider className={styles.divider} />
          </div>
        </>
      ))}
      {data && (
        <>
          <WhereBuyItem
            key={data.autoData.autoId}
            id={String(data.autoData.autoId)}
            carName={`${data.markName} ${data.modelName} ${data.autoData.year}`}
            url={`https://auto.ria.com/uk${data.linkToView}`}
            price={data.USD}
            description={data.autoData.description}
          />
          <div className={styles.dividerDiv}>
            <Divider className={styles.divider} />
          </div>
        </>
      )}
      <div className={styles.seeAll}>
        <button className={styles.moreButton}>See All 10</button>
      </div>
    </div>
  );
};

export { WhereToBuy };
