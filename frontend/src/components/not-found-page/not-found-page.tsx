import { FC } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import crashedCar from '@assets/images/not-found-page/crashed-car.svg';
import leftCircles from '@assets/images/not-found-page/left-circles.svg';
import rightCircles from '@assets/images/not-found-page/right-circles.svg';
import { AppRoute } from '@common/enums/enums';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const NotFoundPage: FC = () => {
  return (
    <main className={styles.NotFound}>
      <Link to={AppRoute.ROOT}>
        <img
          className={clsx(styles.logo, styles.NotFoundLogo)}
          src={Logo}
          alt="logo"
        />
      </Link>
      <div>
        <img
          className={styles.NotFoundImg}
          src={crashedCar}
          alt="crashed car"
        />
      </div>
      <div className={styles.NotFoundContent}>
        <h1 className={styles.NotFoundTitle}>404</h1>
        <span className={styles.NotFoundLine}></span>
        <p className={styles.NotFoundText}>
          The page you are looking for could not be found.
        </p>
        <Link
          to={AppRoute.ROOT}
          className={clsx(styles.btnFill, styles.NotFoundBtn)}
        >
          go to home page
        </Link>
      </div>
      <img
        className={clsx(styles.circles, styles.circlesLeft)}
        src={leftCircles}
        alt="left circles"
      />
      <img
        className={clsx(styles.circles, styles.circlesRight)}
        src={rightCircles}
        alt="right circles"
      />
    </main>
  );
};

export { NotFoundPage };
