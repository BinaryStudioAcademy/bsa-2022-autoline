import React from 'react';

import { ComparisonInfo } from '@autoline/shared';
import { useUpdatePositionsMutation } from '@store/queries/comparisons';

import { Complectation } from './complectation';
import { NoActiveComparison } from './no-active-comparison';
import styles from './styles.module.scss';

export const Comparison = ({
  positions,
  cars,
}: {
  positions: string[] | undefined;
  cars: ComparisonInfo[] | undefined;
}): React.ReactElement => {
  const [updatePositions] = useUpdatePositionsMutation();
  const broadcast = new BroadcastChannel('compare');

  const onCarDelete = (complectationId: string): void => {
    const newPositions = positions?.filter((p) => p != complectationId);
    if (newPositions) updatePositions(newPositions);
    broadcast.postMessage('compare');
  };

  if (cars?.length === 0) return <NoActiveComparison />;

  return (
    <div className={styles.comparisonContainer}>
      {cars?.map((car) => {
        return <Complectation key={car.id} car={car} onDelete={onCarDelete} />;
      })}
    </div>
  );
};
