import { FC } from 'react';

import { ComparisonInfo } from '@autoline/shared';
import clsx from 'clsx';

import { ComparisonCarCard } from './comparison-car-card';
import styles from './styles.module.scss';

interface ComparisonsCardProps {
  data: ComparisonInfo[];
}

const ComparisonsCard: FC<ComparisonsCardProps> = ({ data }) => {
  return (
    <div className={clsx(styles.container, 'styledScrollbar')}>
      {data.map((item) => (
        <ComparisonCarCard data={item} />
      ))}
    </div>
  );
};

export { ComparisonsCard };
