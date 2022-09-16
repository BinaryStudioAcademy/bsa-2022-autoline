import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { ComparisonInfo, WishlistInput } from '@autoline/shared';
import { AppRoute } from '@common/enums/enums';
import {
  ArrowLeft,
  ArrowRight,
  HeartIcon,
} from '@components/common/icons/icons';
import { TrashCanIcon } from '@components/common/icons/trash-can/trash-can';
import { WishlistContext } from '@contexts/wishlist-context';
import { formatPrice } from '@helpers/helpers';
import { useAppSelector } from '@hooks/hooks';
import {
  useDeleteCarFromComparisonMutation,
  useGetCarsCountQuery,
} from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const Complectation = ({
  car,
  onDelete,
  onMove,
  firstCar,
  lastCar,
}: {
  car: ComparisonInfo;
  onDelete: (complectationId: string) => void;
  onMove: (complectationId: string, direction: string) => void;
  firstCar?: boolean;
  lastCar?: boolean;
}): React.ReactElement | null => {
  const authToken = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { data: carsCount } = useGetCarsCountQuery(car.id);

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
    <div className={styles.compCar}>
      <div className={styles.positionsBtns}>
        <button
          className={styles.button}
          onClick={(): void => onMove(car.id, 'left')}
          disabled={firstCar}
        >
          <ArrowLeft />
        </button>
        <button
          className={styles.button}
          onClick={(): void => onMove(car.id, 'right')}
          disabled={lastCar}
        >
          <ArrowRight />
        </button>
      </div>
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
          <img src={car.photos[0]} className={styles.carImage} />
          <div className={styles.compCarContainerInfoText}>
            <HashLink
              to={`${AppRoute.DETAILS}?model=${car.modelId}&complectation=${car.id}#completeSet`}
              className={styles.carLink}
              smooth
            >
              {car.brandName} {car.modelName} {car.complectationName}
            </HashLink>
          </div>
          <div className={styles.compCarContainerInfoPrice}>
            <span className={!carsCount ? styles.inactive : undefined}>
              {formatPrice(car.priceStart)} - {formatPrice(car.priceEnd)}
            </span>
          </div>
          <div>
            {carsCount ? (
              <>
                <Link
                  className={styles.link}
                  to={`${AppRoute.DETAILS}?model=${car.modelId}&complectation=${car.id}`}
                >
                  Ads found:
                </Link>{' '}
                {carsCount}
              </>
            ) : (
              'No ads found'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
