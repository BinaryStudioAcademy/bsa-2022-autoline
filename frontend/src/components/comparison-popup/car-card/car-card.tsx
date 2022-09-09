import { FC, Dispatch } from 'react';

import trashIcon from '@assets/images/trash.svg';

import styles from './styles.module.scss';

interface CarCardProps {
  setItemToRemove: Dispatch<(state: string[]) => string[]>;
  data: {
    id: string;
    brandName: string;
    complectationName: string;
    modelId: string;
    modelName: string;
    photos: string[] | [];
    position: number;
    priceEnd: number;
    priceStart: number;
    wishlistId: string | undefined;
  };
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
    setItemToRemove((state: string[]): string[] => state.concat(id));
  };

  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={photos[0]} alt="car image" />
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardPrice}>{`$ ${priceStart} - ${priceEnd}`}</p>
      </div>
      <span onClick={handleRemove} className={styles.cardRemove}>
        <img src={trashIcon} alt="delete icon" />
      </span>
    </div>
  );
};

export { CarCard };
