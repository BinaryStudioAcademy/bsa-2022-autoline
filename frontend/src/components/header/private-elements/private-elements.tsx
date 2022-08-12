import React, { useState } from 'react';

import ArrowDown from '@assets/images/header/arrow-drop-down.svg';
import DefaultAvatar from '@assets/images/header/default-avatar.png';

import { IRemindersProps, Reminders } from '../reminders/reminders';
import styles from './private-elements.module.scss';

interface IPrivateComponentProps extends IRemindersProps {
  avatar: string | undefined | null;
}

export const PrivateElements: React.FC<IPrivateComponentProps> = ({
  favorites,
  notifications,
  comparisons,
  avatar,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.information}>
      <Reminders
        favorites={favorites}
        comparisons={comparisons}
        notifications={notifications}
      />
      <div
        className={styles.avatarCover}
        onClick={(): void => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          className={styles.avatar}
          src={avatar ? avatar : DefaultAvatar}
          alt="avatar"
        />
        <img
          className={`${styles.arrow} ${isMenuOpen ? styles.active : ''}`}
          src={ArrowDown}
          alt="arrow drop down"
        />
        <ul
          className={`${styles.menuDropdown} ${
            isMenuOpen ? styles.active : ''
          }`}
        >
          <li>Settings</li>
          <li>Sign Out</li>
        </ul>
      </div>
    </div>
  );
};
