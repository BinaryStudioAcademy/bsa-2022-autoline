import React, { useState, useEffect } from 'react';

import { ComparisonInfo } from '@autoline/shared';
import { useUpdatePositionsMutation } from '@store/queries/comparisons';

import { Complectation } from './complectation';
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

  const [data, updateData] = useState({ cars, carsIds: positions });

  useEffect(() => {
    updateData({ cars, carsIds: positions });
  }, [cars]);

  const handleMoveCard = (complectationId: string, direction: string): void => {
    if (!positions) return;
    const index = positions.indexOf(complectationId);
    positions.splice(index, 1);

    switch (direction) {
      case 'left':
        positions.splice(index - 1, 0, complectationId);
        break;
      case 'right':
        positions.splice(index + 1, 0, complectationId);
        break;
    }

    const sortedCars = cars?.slice().sort(function (a, b) {
      return positions.indexOf(a.id) - positions.indexOf(b.id);
    });

    const newState = {
      cars: sortedCars,
      carsIds: positions,
    };

    updatePositions(newState.carsIds);
    updateData(newState);
    return;
  };

  return (
    <div className={styles.comparisonContainer}>
      {data.cars?.map((car, index) => {
        if (!index) {
          return (
            <Complectation
              key={car.id}
              car={car}
              onDelete={onCarDelete}
              onMove={handleMoveCard}
              firstCar={true}
            />
          );
        }
        if (data.cars && index === data.cars.length - 1) {
          return (
            <Complectation
              key={car.id}
              car={car}
              onDelete={onCarDelete}
              onMove={handleMoveCard}
              lastCar={true}
            />
          );
        }
        return (
          <Complectation
            key={car.id}
            car={car}
            onDelete={onCarDelete}
            onMove={handleMoveCard}
          />
        );
      })}
    </div>
  );
};
