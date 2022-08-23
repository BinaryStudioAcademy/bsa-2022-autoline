import React from 'react';

import compare from '@assets/images/compare.svg';
import { WishlistInput } from '@autoline/shared/common/types/types';
import { ExtendedCarCardPropsType } from '@common/types/types';
import { HeartIcon } from '@components/common/icons/icons';
import { formatPrice } from '@helpers/helpers';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const NewCarCard: React.FC<ExtendedCarCardPropsType> = (props) => {
  const {
    type,
    isLiked,
    car: {
      id: carId,
      wishlistId,
      name: carName,
      pricesRanges,
      brand: { name: brandName, logoUrl: brandLogoUrl },
      complectationName,
      photoUrls,
      description,
    },
    createWishlist,
    deleteWishlist,
  } = props;

  const minPrices = pricesRanges.map(
    (price: { price_start: number; price_end: number }) => price.price_start,
  );
  const minPrice = formatPrice(Math.min(...minPrices));
  const maxPrices = pricesRanges.map(
    (price: { price_start: number; price_end: number }) => price.price_end,
  );
  const maxPrice = formatPrice(Math.max(...maxPrices));

  const handleCreate = (): void => {
    const data: WishlistInput =
      type === 'model' ? { modelId: carId } : { complectationId: carId };

    createWishlist(data);
  };

  const handleDelete = (): void => {
    deleteWishlist({ wishlistId: wishlistId as string });
  };

  const handleLikeClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    isLiked ? handleDelete() : handleCreate();
  };

  let name = `${brandName} ${carName}`;

  if (complectationName) {
    name = `${name} ${complectationName}`;
  }

  return (
    <div className={styles.wrapper}>
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
          onClick={handleLikeClick}
        >
          <HeartIcon />
        </button>
        <img className={styles.button} src={compare} alt="compare button" />
      </div>
      <img src={photoUrls[0]} alt="car image" className={styles.carImage} />
      <div className={styles.cardFooter}>
        <div className={styles.carContent}>
          <p className={styles.carDescription}>{description}</p>
        </div>
        <hr className={styles.verticalLine} />
        <div className={styles.priceBox}>
          <span className={styles.price}>
            {minPrice} - {maxPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export { NewCarCard };
