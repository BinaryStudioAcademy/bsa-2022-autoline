import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ComparisonInfo, WishlistInput } from '@autoline/shared';
import { AppRoute } from '@common/enums/enums';
import { HeartIcon } from '@components/common/icons/icons';
import { TrashCanIcon } from '@components/common/icons/trash-can/trash-can';
import { WishlistContext } from '@contexts/wishlist-context';
import { useAppSelector } from '@hooks/hooks';
import { useDeleteCarFromComparisonMutation } from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const Complectation = ({
  car,
  onDelete,
}: {
  car: ComparisonInfo;
  onDelete: (complectationId: string) => void;
}): React.ReactElement | null => {
  const authToken = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const { likedCars, handleLikeClick } = useContext(WishlistContext);
  const isLiked = likedCars?.includes(car.id);

  const likeClick = (event?: React.MouseEvent): void => {
    event?.stopPropagation();
    const data: WishlistInput = {
      complectationId: car.id,
      carName: `${car.brandName} ${car.modelName} ${car.complectationName}`,
    };
    handleLikeClick(data);
  };

  const [deleteCar] = useDeleteCarFromComparisonMutation();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteCar = async (complectationId: string): Promise<void> => {
    await deleteCar({ complectationId });
    onDelete(complectationId);
  };

  const handleTrashClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    if (!authToken) {
      navigate(AppRoute.SIGN_IN);
      return;
    }

    setIsDeleted(true);
    handleDeleteCar(car.id);
  };

  if (isDeleted) return null;

  return (
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
          className={clsx(styles.button, styles.iconButton, styles.trashCanBtn)}
          onClick={handleTrashClick}
        >
          <TrashCanIcon />
        </button>
      </div>
      <div className={styles.compCarContainerInfo}>
        <img src={car.photos[0]} className={styles.carImage} />
        <div className={styles.compCarContainerInfoText}>
          {car.brandName} {car.modelName} {car.complectationName}
        </div>
        <div className={styles.compCarContainerInfoPrice}>
          $ {car.priceStart} - {car.priceEnd}
        </div>
        <div>Compare prices 14</div>
      </div>
    </div>
  );
};
