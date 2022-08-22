import { FC, Dispatch } from 'react';

import fillCompare from '@assets/images/icon_balance.svg';

import styles from './styles.module.scss';

interface ModalProps {
  carName: string;
  carDescription: string;
  isHidden: boolean;
  setIsHidden: Dispatch<boolean>;
}

const Modal: FC<ModalProps> = ({
  carName,
  carDescription,
  isHidden,
  setIsHidden,
}) => {
  const closeModal = (): void => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={styles.container} hidden={isHidden}>
      <div className={styles.content}>
        <button className={styles.close} onClick={closeModal}>
          ×
        </button>
        <div className={styles.icon}>
          <button className={styles.button}>
            <img
              className={styles.img}
              src={fillCompare}
              alt="compare button"
            />
          </button>
        </div>
        <div className={styles.message}>
          <span>{'You added '}</span>
          <span className={styles.carName}>{carName}</span>
          <span>{' to the Comparison!'} </span>
          <div className={styles.carDescription}> {carDescription} </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
