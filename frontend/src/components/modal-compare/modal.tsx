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
        <button className={styles.close} onClick={(): void => closeModal()}>
          ×
        </button>
        <div className={styles.icon}>
          <img
            className={styles.button}
            src={fillCompare}
            alt="compare button"
          />
        </div>
        <div className={styles.message}>
          <p className={styles.inline}>{'You added '}</p>
          <p className={styles.carName}>{carName}</p>
          <p className={styles.inline}>{' to the Comparison!'} </p>
          <div className={styles.carDescription}> {carDescription} </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
