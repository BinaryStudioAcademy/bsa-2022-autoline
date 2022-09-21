import { FC, Dispatch } from 'react';

import { ComlectationShortInfoResponse } from '@autoline/shared';
import { CarPreview } from '@autoline/shared/common/types/types';
import { formatPrice } from '@helpers/helpers';

import styles from './style.module.scss';

interface WishlistCardProps {
  addItem: Dispatch<
    (state: ComlectationShortInfoResponse[]) => ComlectationShortInfoResponse[]
  >;
  carData: CarPreview;
}

const WishlistCard: FC<WishlistCardProps> = ({ carData, addItem }) => {
  const { id, brand, modelName, pricesRanges, complectationName, photoUrls } =
    carData;
  const { price_start: priceStart, price_end: priceEnd } = pricesRanges[0];
  const carName = `${brand.name} ${modelName} ${complectationName}`;
  const price = `${formatPrice(+priceStart)} - ${formatPrice(+priceEnd)}`;

  const handleCardClick = (): void => {
    const data = {
      id,
      complectationName: complectationName || '',
      brandName: brand.name,
      modelName,
      photos: photoUrls,
      priceStart,
      priceEnd,
    };
    addItem((state) => [data, ...state]);
  };

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.carPicture}>
        <img src={photoUrls[0]} alt="car" />
      </div>
      <p className={styles.carName}>{carName}</p>
      <p className={styles.price}>{price}</p>
    </div>
  );
};

export { WishlistCard };
