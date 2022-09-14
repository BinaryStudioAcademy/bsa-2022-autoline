import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ComparisonDetail } from '@autoline/shared';
import { AppRoute } from '@common/enums/enums';
import { useChangeActiveComparisonMutation } from '@store/queries/history-of-comparisons';
import clsx from 'clsx';

import { ComparisonCarCard } from './comparison-car-card';
import styles from './styles.module.scss';

interface ComparisonsCardProps {
  data: {
    id: string;
    list: ComparisonDetail[];
  };
}

const ComparisonsCard: FC<ComparisonsCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const [changeActiveComparison, result] = useChangeActiveComparisonMutation();

  useEffect(() => {
    result.status === 'fulfilled' && navigate(AppRoute.COMPARISONS);
  }, [result.status]);
  const handleClick = (): void => {
    changeActiveComparison({ comarisonId: data.id });
  };
  return (
    <div
      onClick={handleClick}
      className={clsx(styles.container, 'styledScrollbar')}
    >
      {data.list.map((item) => (
        <ComparisonCarCard data={item} key={item.complectationId} />
      ))}
    </div>
  );
};

export { ComparisonsCard };
