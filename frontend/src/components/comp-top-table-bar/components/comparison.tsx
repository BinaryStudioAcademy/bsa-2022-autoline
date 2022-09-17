import React, { useState, useEffect, useContext, useMemo } from 'react';

import { ComparisonInfo } from '@autoline/shared';
import { CompareContext } from '@contexts/compare-context';
import { useUpdatePositionsMutation } from '@store/queries/comparisons';

import { Complectation } from './complectation';
import styles from './styles.module.scss';

export const Comparison = ({
  cars,
}: {
  cars: ComparisonInfo[] | undefined;
}): React.ReactElement => {
  const [updatePositions] = useUpdatePositionsMutation();
  const broadcast = new BroadcastChannel('compare');

  const positions = useMemo(() => {
    return cars?.map((car) => car.id);
  }, [cars]);

  const { handleDeleteFromCompare } = useContext(CompareContext);

  const onCarDelete = async (car: ComparisonInfo): Promise<void> => {
    handleDeleteFromCompare(
      car.id,
      `${car.brandName} ${car.modelName} ${car.complectationName}`,
      car.position,
    );

    const newPositions = positions?.filter((p) => p != car.id);
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
