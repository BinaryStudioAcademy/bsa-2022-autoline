import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/enums';

import styles from './styles.module.scss';

export const Footer = (): React.ReactElement => {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <Link to={AppRoute.ROOT}>
          <img className={styles.logo} src={Logo} alt="Autoline" />
        </Link>
        <Link to={AppRoute.SEARCH}>Search</Link>
        <Link to={AppRoute.ABOUT}>About us</Link>
      </div>

      <div className={styles.copyright}>Copyright © Autoline 2022</div>
    </div>
  );
};
