import React from 'react';

import Bell from '@assets/images/header/bell.svg';
import Comparisons from '@assets/images/header/comparisons.svg';
import Heart from '@assets/images/header/heart.svg';

import styles from './reminders.module.scss';

export interface IRemindersProps {
  favorites: number;
  notifications: number;
  comparisons: number;
}

export const Reminders: React.FC<IRemindersProps> = ({
  favorites,
  notifications,
  comparisons,
}) => {
  const reminderItems = [
    {
      src: Heart,
      alt: 'heart',
      value: favorites,
    },
    {
      src: Bell,
      alt: 'bell',
      value: notifications,
    },
    {
      src: Comparisons,
      alt: 'comparisons',
      value: comparisons,
    },
  ];

  return (
    <ul className={styles.reminder}>
      {reminderItems.map((item) => (
        <li key={item.src}>
          <img src={item.src} alt={item.alt} />
          <div className={styles.reminderCounter}>
            <span>{item.value}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
