import { FC } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import arrowIcon from '@assets/images/arrow-right-left.svg';
import balanceIcon from '@assets/images/compare.svg';
import eyeIcon from '@assets/images/eye.svg';
import heartIcon from '@assets/images/heart.svg';
import { useGetHistoryOfViwedCarsQuery } from '@store/queries/history-viewed-cars';
import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';

import styles from './styles.module.scss';

const UserInfoPanel: FC = () => {
  const comparisonCount = 0;
  const comparedCount = 0;
  const { data: wishlistData, isLoading: wishlistIsLoading } =
    useGetWishlistsQuery();
  const { data: viewedData, isLoading: viewedIsLoading } =
    useGetHistoryOfViwedCarsQuery({});
  const wishlistCount =
    (wishlistData?.complectations.length || 0) +
    (wishlistData?.models.length || 0);
  return (
    <ul className={styles.UserPanel}>
      <li className={styles.UserPanelItem}>
        <img className={styles.UserPanelIcon} src={heartIcon} alt="liked it" />
        <Link to="#liked" className={styles.UserPanelLink}>
          Liked
        </Link>
        <span className={styles.UserPanelBadgeInfo}>
          {wishlistIsLoading || wishlistCount}
        </span>
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
        <span className={styles.UserPanelBadgeInfo}>
          {viewedIsLoading || viewedData?.count}
        </span>
      </li>
    </ul>
  );
};

export { UserInfoPanel };
