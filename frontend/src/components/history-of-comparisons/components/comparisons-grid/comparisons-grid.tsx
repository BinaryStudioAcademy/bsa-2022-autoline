import { FC } from 'react';

import { useGetComparisonCarsQuery } from '@store/queries/comparisons';

import { ComparisonsCard } from '../comparisons-card/comparisons-card';
import styles from './style.module.scss';

const ComparisonsGrid: FC = () => {
  const { data, isLoading } = useGetComparisonCarsQuery();

  if (isLoading) return null;

  return (
    <div className={styles.carGrid}>
      {data &&
        [data, data, data].map((item) => <ComparisonsCard data={item} />)}
    </div>
  );
};

export { ComparisonsGrid };
