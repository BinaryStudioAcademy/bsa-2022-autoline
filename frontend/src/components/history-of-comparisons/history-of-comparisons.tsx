import { FC } from 'react';

import { ComparisonsGrid } from './components/comparisons-grid/comparisons-grid';
import styles from './styles.module.scss';

const HistoryOfComparisons: FC = () => {
  return (
    <>
      <h4 id="compared" className={styles.title}>
        History of comparisons
      </h4>
      <ComparisonsGrid />
    </>
  );
};

export { HistoryOfComparisons };
