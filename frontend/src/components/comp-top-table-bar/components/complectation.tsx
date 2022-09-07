import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import { ComplPreviewInfo, WishlistInput } from '@autoline/shared';
import { AppRoute } from '@common/enums/enums';
import { HeartIcon } from '@components/common/icons/icons';
import { TrashCanIcon } from '@components/common/icons/trash-can/trash-can';
import { WishlistContext } from '@contexts/wishlist-context';
import { useAppSelector } from '@hooks/hooks';
import { useDeleteCarFromComparisonMutation } from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const Complectation = (props: {
  car: ComplPreviewInfo;
  index: number;
}): React.ReactElement => {
  const authToken = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [isDeleted, setIsDeleted] = useState(false);

  const [deleteCar] = useDeleteCarFromComparisonMutation();

  const handleDeleteCar = async (complectationId: string): Promise<void> => {
    await deleteCar({ complectationId });
  };

  const { likedCars, handleLikeClick } = useContext(WishlistContext);
  const isLiked = likedCars?.includes(props.car.id);

  const likeClick = (event?: React.MouseEvent): void => {
    event?.stopPropagation();
    const data: WishlistInput = { complectationId: props.car.id };
    handleLikeClick(data);
  };

  const handleTrashClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    if (!authToken) {
      navigate(AppRoute.SIGN_IN);
      return;
    }

    setIsDeleted(true);
    handleDeleteCar(props.car.id);
  };

  return (
    <>
      {!isDeleted && (
        <Draggable
          key={props.car.id}
          draggableId={props.car.id}
          index={props.index}
        >
          {(provided): React.ReactElement => (
            <div
              className={styles.carContainer}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className={styles.compCarContainer}>
                <div className={styles.compCarContainerBtns}>
                  <button
                    className={clsx(
                      styles.button,
                      styles.iconButton,
                      isLiked && styles.isLiked,
                    )}
                    onClick={likeClick}
                  >
                    <HeartIcon />
                  </button>
                  <button
                    className={clsx(
                      styles.button,
                      styles.iconButton,
                      styles.trashCanBtn,
                    )}
                    onClick={handleTrashClick}
                  >
                    <TrashCanIcon />
                  </button>
                </div>
                <div className={styles.compCarContainerInfo}>
                  <img src={props.car.photos[0]} className={styles.carImage} />
                  <div className={styles.compCarContainerInfoText}>
                    {props.car.brandName} {props.car.modelName}{' '}
                    {props.car.complectationName}
                  </div>
                  <div className={styles.compCarContainerInfoPrice}>
                    $ {props.car.priceStart} - {props.car.priceEnd}
                  </div>
                  <div>Compare prices 14</div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};
