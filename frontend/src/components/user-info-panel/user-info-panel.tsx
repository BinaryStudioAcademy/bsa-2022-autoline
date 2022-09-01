import { FC } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import arrowIcon from '@assets/images/arrow-right-left.svg';
import balanceIcon from '@assets/images/compare.svg';
import eyeIcon from '@assets/images/eye.svg';
import heartIcon from '@assets/images/heart.svg';

import styles from './styles.module.scss';

const UserInfoPanel: FC = () => {
  const likedItCount = 0;
  const comparisonCount = 0;
  const comparedCount = 0;
  const viewedCout = 0;
  return (
    <ul className={styles.UserPanel}>
      <li className={styles.UserPanelItem}>
        <img className={styles.UserPanelIcon} src={heartIcon} alt="liked it" />
        <Link to="#liked" className={styles.UserPanelLink}>
          Liked it
        </Link>
        <span className={styles.UserPanelBadgeInfo}>{likedItCount}</span>
      </li>
      <li className={styles.UserPanelItem}>
        <img
          className={styles.UserPanelIcon}
          src={balanceIcon}
          alt="comparison"
        />
        <Link to="#comparison" className={styles.UserPanelLink}>
          Comparison
        </Link>
        <span className={styles.UserPanelBadgeInfo}>{comparisonCount}</span>
      </li>
      <li className={styles.UserPanelItem}>
        <img className={styles.UserPanelIcon} src={arrowIcon} alt="compared" />
        <Link to="#compared" className={styles.UserPanelLink}>
          Compared
        </Link>
        <span className={styles.UserPanelBadgeInfo}>{comparedCount}</span>
      </li>
      <li className={styles.UserPanelItem}>
        <img
          className={styles.UserPanelIcon}
          src={eyeIcon}
          alt="history of viewed cars"
        />
        <Link to="#viewed" className={styles.UserPanelLink}>
          History of viewed cars
        </Link>
        <span className={styles.UserPanelBadgeInfo}>{viewedCout}</span>
      </li>
    </ul>
  );
};

export { UserInfoPanel };
