import { FC } from 'react';

import fillCompare from '@assets/images/icon_balance.svg';

import styles from './styles.module.scss';

interface ModalProps {
  carName: string;
  clearNotification: () => void;
}

const CompareToast: FC<ModalProps> = ({ carName, clearNotification }) => {
  return (
    <div className={styles.container}>
      <div className={styles.timer}></div>
      <div className={styles.content}>
        <button className={styles.close} onClick={clearNotification}>
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
        </div>
      </div>
    </div>
  );
};

export { CompareToast };
