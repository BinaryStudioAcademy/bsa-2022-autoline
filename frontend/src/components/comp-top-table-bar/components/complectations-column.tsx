import React, { JSXElementConstructor } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ComplPreviewInfo } from '@autoline/shared';

import { Complectation } from './complectation';
import styles from './styles.module.scss';

export const ComplectationsColumn = ({
  column,
  cars,
}: {
  column: {
    id: string;
    carsIds: string[] | undefined;
  };
  cars: ComplPreviewInfo[] | undefined;
}): React.ReactElement => {
  return (
    <>
      {cars?.length != 0 ? (
        <div className={styles.droppableContainer}>
          <Droppable droppableId={column.id} direction="horizontal">
            {(
              provided,
            ): React.ReactElement<
              HTMLElement,
              string | JSXElementConstructor<void>
            > => (
              <div
                className={styles.carsList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cars?.map((car, index) => {
                  return <Complectation key={car.id} car={car} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ) : (
        <div className={styles.noCarsError}>
          You have got no cars
          <br />
          in this comparison yet.
        </div>
      )}
    </>
  );
};
