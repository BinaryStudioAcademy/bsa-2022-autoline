import { FC, Dispatch, useEffect } from 'react';

import fillCompare from '@assets/images/icon_balance.svg';

import styles from './styles.module.scss';

interface ModalProps {
  carName: string;
  carDescription: string;
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
}

const CompareToast: FC<ModalProps> = ({
  carName,
  carDescription,
  isOpen,
  setIsOpen,
}) => {
  const closeToast = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isHidden) {
      const timer = setTimeout(closeToast, 6000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isHidden]);

  return (
    <div className={styles.container} hidden={!isOpen}>
      <div className={styles.content}>
        <button className={styles.close} onClick={closeToast}>
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

export { CompareToast };
