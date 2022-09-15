import { FC } from 'react';

import { ComparisonDetail } from '@autoline/shared';
import { formatPrice } from '@helpers/helpers';

import styles from './styles.module.scss';

interface ComparisonsCardProps {
  data: ComparisonDetail;
}

const ComparisonCarCard: FC<ComparisonsCardProps> = ({ data }) => {
  const {
    brandName,
    modelName,
    complectationName,
    priceEnd,
    priceStart,
    photos,
    year,
  } = data;

  const carName = `${brandName} ${modelName} ${complectationName} ${year}`;
  const price = `${formatPrice(+priceStart)} - ${formatPrice(+priceEnd)}`;
  return (
    <div className={styles.card}>
      <div className={styles.carPicture}>
        <img src={photos[0]} alt="car" />
      </div>
      <p className={styles.carName}>{carName}</p>
      <p className={styles.price}>{price}</p>
    </div>
  );
};

export { ComparisonCarCard };
