import { useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { ComplPreviewInfo } from '@autoline/shared';
import { useUpdatePositionsMutation } from '@store/queries/comparisons';

import { ComplectationsColumn } from './complectations-column';
import styles from './styles.module.scss';

export const DragAndDrop = ({
  initialData,
}: {
  initialData: {
    cars: ComplPreviewInfo[] | undefined;
    columns: { id: string; carsIds: string[] | undefined }[];
  };
}): React.ReactElement => {
  const [data, updateData] = useState(initialData);

  const [updatePositions] = useUpdatePositionsMutation();

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const home = data.columns[parseInt(source.droppableId)];
    const foreign = data.columns[parseInt(destination.droppableId)];

    if (home === foreign && home.carsIds) {
      const newCarIds = Array.from(home.carsIds);
      newCarIds.splice(source.index, 1);
      newCarIds.splice(destination.index, 0, draggableId);
      const newHome = {
        ...home,
        carsIds: newCarIds,
      };

      const newState = {
        ...data,
        columns: [newHome],
      };

      updatePositions(newState.columns[0].carsIds);
      updateData(newState);
      return;
    }
  };

  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    addEventListener(
      'wheel',
      () => {
        const currentElement = ref.current;
        if (currentElement) {
          const onWheel = (e: WheelEvent): void => {
            if (e.deltaY == 0) return;
            e.preventDefault();
            currentElement.scrollTo({
              left: currentElement.scrollLeft + 5 * e.deltaY,
              behavior: 'smooth',
            });
          };
          currentElement.addEventListener('wheel', onWheel);
          return (): void =>
            currentElement.removeEventListener('wheel', onWheel);
        }
      },
      { passive: false },
    );
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={styles.slider}
        ref={ref as React.RefObject<HTMLInputElement>}
      >
        {((): React.ReactElement => {
          const column = data.columns[0];
          let cars;
          const fetchedData = data.cars;
          if (fetchedData) {
            cars = column.carsIds?.map((carId) => {
              const index = fetchedData.findIndex((car) => car.id === carId);
              return fetchedData[index];
            });
          } else {
            cars = undefined;
          }

          return (
            <ComplectationsColumn key={column.id} column={column} cars={cars} />
          );
        })()}
      </div>
    </DragDropContext>
  );
};
