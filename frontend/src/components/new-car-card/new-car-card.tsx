import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import compare from '@assets/images/compare.svg';
import {
  WishlistInput,
  DeleteWishlistInput,
} from '@autoline/shared/common/types/types';
import { AppRoute } from '@common/enums/enums';
import { ExtendedCarCardPropsType } from '@common/types/types';
import { HeartIcon } from '@components/common/icons/icons';
import { CompareToast } from '@components/compare-toast/compare-toast';
import { formatPrice } from '@helpers/helpers';
import { useAppSelector } from '@hooks/hooks';
import {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} from '@store/queries/preferences/wishlist';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const NewCarCard: React.FC<ExtendedCarCardPropsType> = (props) => {
  const authToken = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState<boolean>(true);
  const handleCompare = (): void => {
    setIsHidden(false);
  };

  const {
    type,
    car: {
      id: carId,
      wishlistId,
      modelName: carName,
      pricesRanges,
      brand: { name: brandName, logoUrl: brandLogoUrl },
      complectationName,
      photoUrls,
      description,
    },
  } = props;

  const [isLiked, setIsLiked] = useState(Boolean(wishlistId));

  const minPrices = pricesRanges.map(
    (price: { price_start: number; price_end: number }) => price.price_start,
  );
  const minPrice = formatPrice(Math.min(...minPrices));
  const maxPrices = pricesRanges.map(
    (price: { price_start: number; price_end: number }) => price.price_end,
  );
  const maxPrice = formatPrice(Math.max(...maxPrices));

  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleCreateWishlist = async (): Promise<void> => {
    const data: WishlistInput =
      type === 'model' ? { modelId: carId } : { complectationId: carId };

    await createWishlist(data);
  };

  const handleDeleteWishlist = async (): Promise<void> => {
    const data: DeleteWishlistInput = { wishlistId: wishlistId as string };
    await deleteWishlist(data);
  };

  const handleLikeClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    if (!authToken) {
      navigate(AppRoute.SIGN_IN);
      return;
    }

    isLiked ? handleDeleteWishlist() : handleCreateWishlist();
    setIsLiked(!isLiked);
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
        <button
          className={clsx(styles.button, styles.iconButton)}
          onClick={handleCompare}
        >
          <img src={compare} alt="compare button" />
        </button>
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
      <CompareToast
        carName={name}
        carDescription={description}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
      />
    </div>
  );
};

export { NewCarCard };
