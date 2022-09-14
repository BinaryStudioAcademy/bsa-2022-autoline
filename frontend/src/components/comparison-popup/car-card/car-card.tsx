import { FC, Dispatch } from 'react';

import trashIcon from '@assets/images/trash.svg';
import { ComlectationShortInfoResponse } from '@autoline/shared';
import { formatPrice } from '@helpers/helpers';

import styles from './styles.module.scss';

interface CarCardProps {
  setItemToRemove: Dispatch<
    (state: ComlectationShortInfoResponse[]) => ComlectationShortInfoResponse[]
  >;
  data: ComlectationShortInfoResponse;
}

const CarCard: FC<CarCardProps> = ({ data, setItemToRemove }) => {
  const {
    id,
    brandName,
    complectationName,
    modelName,
    priceEnd,
    priceStart,
    photos,
  } = data;
  const title = `${brandName} ${modelName} ${complectationName}`;

  const handleRemove = (): void => {
    setItemToRemove((state) => [...state].filter((item) => item.id !== id));
  };

  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={photos[0]} alt="car image" />
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardPrice}>
          {`${formatPrice(priceStart)} - ${formatPrice(priceEnd)}`}
        </p>
      </div>
      <span onClick={handleRemove} className={styles.cardRemove}>
        <img src={trashIcon} alt="delete icon" />
      </span>
    </div>
  );
};

export { CarCard };
