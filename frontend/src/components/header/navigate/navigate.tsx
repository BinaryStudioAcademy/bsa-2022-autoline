import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './navigate.module.scss';

export const Navigate: React.FC = () => {
  const location = useLocation();

  const navigateItems = [
    {
      navigateTo: '#',
      title: 'Used Cars',
    },
    {
      navigateTo: '#',
      title: 'New Cars',
    },
    {
      navigateTo: '#',
      title: 'About Us',
    },
  ];

  return (
    <ul className={styles.navigate}>
      {navigateItems.map((item) => (
        <li
          key={item.title}
          className={
            location.pathname === item.navigateTo ? styles.itemActive : ''
          }
        >
          <Link to={item.navigateTo}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};
