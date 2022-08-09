import { FC } from 'react';

import styles from './styles.module.scss';

const CarDescription: FC = () => {
  return (
    <p className={styles.carDescription}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui mi aliquet
      enim ultrices ornare maecenas non enim amet...
    </p>
  );
};

export { CarDescription };
