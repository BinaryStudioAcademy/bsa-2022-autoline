import { FC } from 'react';

import arrowIcon from '@assets/images/arrow-right-left.svg';
import balanceIcon from '@assets/images/compare.svg';
import eyeIcon from '@assets/images/eye.svg';
import heartIcon from '@assets/images/heart.svg';

import styles from './styles.module.scss';

const UserInfoPanel: FC = () => {
  const likedItCount = 1;
  const comparisonCount = 5;
  const comparedCount = 3;
  const viewedCout = 2;
  return (
    <ul className={styles.UserPanel}>
      <li className={styles.UserPanelItem}>
        <img className={styles.UserPanelIcon} src={heartIcon} alt="liked it" />
        <a className={styles.UserPanelLink} href="#">
          Liked it
        </a>
        <span className={styles.UserPanelBadgeInfo}>{likedItCount}</span>
      </li>
      <li className={styles.UserPanelItem}>
        <img
          className={styles.UserPanelIcon}
          src={balanceIcon}
          alt="liked it"
        />
        <a className={styles.UserPanelLink} href="#">
          Comparison
        </a>
        <span className={styles.UserPanelBadgeInfo}>{comparisonCount}</span>
      </li>
      <li className={styles.UserPanelItem}>
        <img className={styles.UserPanelIcon} src={arrowIcon} alt="liked it" />
        <a className={styles.UserPanelLink} href="#">
          Compared
        </a>
        <span className={styles.UserPanelBadgeInfo}>{comparedCount}</span>
      </li>
      <li className={styles.UserPanelItem}>
        <img className={styles.UserPanelIcon} src={eyeIcon} alt="liked it" />
        <a className={styles.UserPanelLink} href="#">
          History of viewed cars
        </a>
        <span className={styles.UserPanelBadgeInfo}>{viewedCout}</span>
      </li>
    </ul>
  );
};

export { UserInfoPanel };
