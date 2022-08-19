import React from 'react';

import compare from '@assets/images/compare.svg';
import { WishlistInput } from '@autoline/shared/common/types/types';
import { ExtendedCarCardPropsType } from '@common/types/types';
import { Heart } from '@components/common/icons/icons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const NewCarCard: React.FC<ExtendedCarCardPropsType> = (props) => {
  const formatPriceNumber = (num: number): string => {
    const price = num.toString().split('.');
    let numberPart = price[0];
    const floatPart = price.length > 1 ? '.' + price[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(numberPart)) {
      numberPart = numberPart.replace(rgx, '$1' + ' ' + '$2');
    }
    return numberPart + floatPart;
  };

  const minPrices = props.car.pricesRanges.map(
    (price: { price_start: number; price_end: number }) => price.price_start,
  );
  const minPrice = formatPriceNumber(Math.min.apply(null, minPrices));
  const maxPrices = props.car.pricesRanges.map(
    (price: { price_start: number; price_end: number }) => price.price_end,
  );
  const maxPrice = formatPriceNumber(Math.max.apply(null, maxPrices));

  const handleCreate = (): void => {
    const data: WishlistInput = {
      modelId: props.type === 'model' ? props.car.id : undefined,
      complectationId:
        props.type === 'complectation' ? props.car.id : undefined,
    };

    props.createWishlist(data);
  };

  const handleDelete = (): void => {
    props.deleteWishlist(props.car.id);
  };

  const handleLikeClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    props.isLiked ? handleDelete() : handleCreate();
  };

  let name = props.car.brand?.name.concat(' ', props.car.name);

  if (props.car.complectationName) {
    name = props.car.brand?.name.concat(' ', props.car.complectationName);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.carTitle}>
        {props.car.brand && (
          <img
            className={styles.carLogo}
            src={props.car.brand?.logoUrl}
            alt={props.car.brand?.name}
          />
        )}
        <span className={styles.carName}>{name}</span>
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          className={clsx(
            styles.button,
            styles.iconButton,
            props.isLiked && styles.isLiked,
          )}
          onClick={handleLikeClick}
        >
          <Heart />
        </button>
        <img className={styles.button} src={compare} alt="compare button" />
      </div>
      {props.car.photoUrls && (
        <img
          src={props.car.photoUrls[0]}
          alt="car image"
          className={styles.carImage}
        ></img>
      )}
      <div className={styles.cardFooter}>
        <div className={styles.carContent}>
          <p className={styles.carDescription}>{props.car.description}</p>
        </div>
        <hr className={styles.verticalLine} />
        <div className={styles.priceBox}>
          <span className={styles.price}>
            $ {minPrice} - $ {maxPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export { NewCarCard };
