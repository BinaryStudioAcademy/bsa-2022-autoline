import React, { FC } from 'react';

import { ButtonOutline } from '../button-outline/button-outline';
import styles from './styles.module.scss';

interface ModalProps {
  children?: React.ReactNode;
  undo?: () => void;
}

const Notification: FC<ModalProps> = (props) => {
  const { children, undo } = props;

  return (
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
  );
};

export { Notification };
