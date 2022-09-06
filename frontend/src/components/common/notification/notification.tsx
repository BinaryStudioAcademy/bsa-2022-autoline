import React, { FC } from 'react';

import { ButtonOutline } from '../button-outline/button-outline';
import styles from './styles.module.scss';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  icon?: React.ReactElement;
  undo?: () => void;
}

const Notification: FC<ModalProps> = (props) => {
  const { children, isOpen, setIsOpen, icon, undo } = props;

  const closeNotification = (): void => setIsOpen(!isOpen);

  isOpen && setTimeout(closeNotification, 6000);

  return (
    <div className={styles.container} hidden={!isOpen}>
      <div className={styles.content}>
        <button className={styles.close} onClick={closeNotification}>
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
