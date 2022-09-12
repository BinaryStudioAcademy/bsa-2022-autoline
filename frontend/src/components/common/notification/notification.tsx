import React, { FC, useEffect } from 'react';

import { ButtonOutline } from '../button-outline/button-outline';
import styles from './styles.module.scss';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clearNotification: () => void;
  icon?: React.ReactElement;
  undo?: () => void;
}

const Notification: FC<ModalProps> = (props) => {
  const { children, isOpen, setIsOpen, icon, undo, clearNotification } = props;

  const closeNotification = (): void => {
    clearNotification();
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(closeNotification, 6000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  return (
    <div className={styles.container} hidden={!isOpen}>
      <div className={styles.content}>
        <button className={styles.close} onClick={clearNotification}>
          ×
        </button>
        <div className={styles.icon}>
          <button className={styles.button}>{icon}</button>
        </div>
        <div className={styles.message}>
          <p className={styles.messageText}>{children}</p>
          {undo && (
            <ButtonOutline
              text="Undo?"
              onClick={undo}
              className={styles.undoButton}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { Notification };
