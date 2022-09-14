import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '@common/enums/enums';
import { ViewedCarData } from '@common/types/types';
import { formatPrice } from '@helpers/helpers';
import { useAddViewedCarMutation } from '@store/queries/history-viewed-cars';

import styles from './styles.module.scss';

const ShortCarCard: FC<ViewedCarData> = ({ carData }) => {
  const navigate = useNavigate();
  const {
    brand,
    model,
    complectation,
    complectationId,
    year,
    photo_urls,
    priceStart,
    priceEnd,
    modelId,
  } = carData;
  const [addViewedCar] = useAddViewedCarMutation();
  const carName = `${brand} ${model} ${complectation} ${year}`;
  const price = `${formatPrice(+priceStart)} - ${formatPrice(+priceEnd)}`;

  const handleCardClick = (): void => {
    navigate({
      pathname: AppRoute.DETAILS,
      search: `?model=${modelId}&complectation=${complectationId}`,
    });
    addViewedCar({ complectationId });
  };
  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.carPicture}>
        <img src={photo_urls[0]} alt="car" />
      </div>
      <p className={styles.carName}>{carName}</p>
      <p className={styles.price}>{price}</p>
    </div>
  );
};

export { ShortCarCard };
