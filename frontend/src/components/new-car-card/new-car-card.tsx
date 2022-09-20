import React, { MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { WishlistInput } from '@autoline/shared/common/types/types';
import { AppRoute } from '@common/enums/enums';
import { ExtendedCarCardPropsType } from '@common/types/types';
import { HeartIcon } from '@components/common/icons/icons';
import { CompareContext } from '@contexts/compare-context';
import { WishlistContext } from '@contexts/wishlist-context';
import { formatPrice } from '@helpers/helpers';
import { useAppSelector } from '@hooks/hooks';
import BalanceIcon from '@mui/icons-material/Balance';
import { selectAuthToken } from '@store/selectors';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const NewCarCard: React.FC<ExtendedCarCardPropsType> = (props) => {
  const authToken = useAppSelector(selectAuthToken);
  const navigate = useNavigate();
  const {
    type,
    car: {
      id: carId,
      modelId,
      modelName: carName,
      pricesRanges,
      brand: { name: brandName, logoUrl: brandLogoUrl },
      complectationName,
      photoUrls,
      description,
      createdAt,
    },
  } = props;
  const { likedCars, handleLikeClick } = useContext(WishlistContext);
  const { comparedCars, handleCompareClick } = useContext(CompareContext);

  const isLiked = likedCars?.includes(carId);

  const minPrices = pricesRanges.map(
    (price: { price_start: number; price_end: number }) => price.price_start,
  );
  const minPrice = formatPrice(Math.min(...minPrices));
  const maxPrices = pricesRanges.map(
    (price: { price_start: number; price_end: number }) => price.price_end,
  );
  const maxPrice = formatPrice(Math.max(...maxPrices));

  const likeClick = (event?: React.MouseEvent): void => {
    event?.stopPropagation();
    const data: WishlistInput =
      type === 'model'
        ? {
            modelId: carId,
            carName: `${props.car.brand.name} ${props.car.modelName}`,
            createdAt: createdAt || '',
          }
        : {
            complectationId: carId,
            carName: `${props.car.brand.name} ${props.car.modelName} ${props.car.complectationName}`,
            createdAt: createdAt || '',
          };

    if (!authToken) {
      navigate(AppRoute.SIGN_IN);
      return;
    }

    handleLikeClick(data);
  };

  const compareClick = (event?: MouseEvent): void => {
    event?.stopPropagation();
    handleCompareClick(carId, `${brandName} ${carName} ${complectationName}`);
  };

  const handleCardClick = (): void => {
    type !== 'model'
      ? navigate({
          pathname: AppRoute.DETAILS,
          search: `?model=${modelId}&complectation=${carId}`,
        })
      : navigate({ pathname: AppRoute.DETAILS, search: `?model=${carId}` });
    scrollTo(0, 0);
  };

  let name = `${brandName} ${carName}`;

  if (complectationName) {
    name = `${name} ${complectationName}`;
  }

  return (
    <div className={styles.wrapper} onClick={handleCardClick}>
      <div className={styles.carTitle}>
        <img className={styles.carLogo} src={brandLogoUrl} alt={brandName} />
        <span className={styles.carName}>{name}</span>
      </div>
      <div className={styles.buttonsWrapper}>
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
        {type === 'complectation' && (
          <button
            className={clsx(
              styles.button,
              styles.iconButton,
              styles.compareButton,
              comparedCars?.includes(carId) && styles.isCompared,
            )}
            onClick={compareClick}
          >
            <BalanceIcon color="primary" sx={{ fontSize: 18 }} />
          </button>
        )}
      </div>
      <img src={photoUrls[0]} alt="car image" className={styles.carImage} />
      <div className={styles.cardFooter}>
        <div className={styles.carContent}>
          <p className={styles.carDescription}>{description}</p>
        </div>
        <hr className={styles.verticalLine} />
        <div className={styles.priceBox}>
          <span className={styles.price}>
            {minPrice} -<br />
            {maxPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export { NewCarCard };
