import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/enums';

import styles from './styles.module.scss';

export const Footer = (): React.ReactElement => {
  const scroll = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <Link to={AppRoute.ROOT} onClick={scroll}>
          <img className={styles.logo} src={Logo} alt="Autoline" />
        </Link>
        <Link to={AppRoute.SEARCH} onClick={scroll}>
          Search
        </Link>
        <Link to={AppRoute.ABOUT} onClick={scroll}>
          About us
        </Link>
      </div>

      <div className={styles.copyright}>Copyright © Autoline 2022</div>
    </div>
  );
};
