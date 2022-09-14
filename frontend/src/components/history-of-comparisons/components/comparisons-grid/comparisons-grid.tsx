import { FC } from 'react';

import { Spinner } from '@components/common/spinner/spinner';
import { useGetAllComparisonsQuery } from '@store/queries/history-of-comparisons';

import { ComparisonsCard } from '../comparisons-card/comparisons-card';
import styles from './style.module.scss';

const ComparisonsGrid: FC = () => {
  const { data, isLoading } = useGetAllComparisonsQuery();

  if (isLoading) return <Spinner />;

  if (data?.count === 0) return <p>Nothing in the list of comparisons cars.</p>;

  return (
    <div className={styles.carGrid}>
      {data &&
        data.comparisons.map((item) => (
          <ComparisonsCard data={item} key={item.id} />
        ))}
    </div>
  );
};

export { ComparisonsGrid };
