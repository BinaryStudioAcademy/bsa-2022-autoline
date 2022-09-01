import { Link } from 'react-router-dom';

import Car from '@assets/images/landing-page/picture.png';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { CarsCategories } from '@components/cars-categories/cars-categories';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { NewCarCard } from '@components/new-car-card/new-car-card';
import { SimpleAutoFilter } from '@components/simple-auto-filter/simple-auto-filter';
import { TopCarsAutoria } from '@components/top-cars-autoria/top-cars-autoria';
import { useAppSelector } from '@hooks/hooks';
import { Container } from '@mui/material';
import { useGetNewCarsQuery } from '@store/queries/new-cars';
import { clsx } from 'clsx';

import { Header } from './components/components';
import styles from './styles.module.scss';

export const LandingPage = (): React.ReactElement => {
  const { data: cars } = useGetNewCarsQuery(4);
  const isAuth = useAppSelector((state) => state.auth.token);
  return (
    <>
      <Header />
      <Container
        sx={{ maxWidth: '100% !important' }}
        className={styles.mainContainer}
      >
        <div className={styles.firstContainer}>
          <div className={styles.firstContainerLeft}>
            <div className={styles.firstContainerLeftTextMain}>
              find a car
              <br />
              at your price
            </div>
            <div className={styles.firstContainerLeftTextSecondary}>
              We are the best service for finding cars for sale.
              <br />
              Both new & used. Find the car of your dreams with us!
            </div>
            {!isAuth && (
              <div className={styles.firstContainerLeftButtons}>
                <Link to={AppRoute.SIGN_UP}>
                  <ButtonFill
                    className={clsx(styles.button, styles.buttonFill)}
                    text="Create Account"
                  />
                </Link>
                <Link to={AppRoute.SIGN_IN}>
                  <ButtonOutline
                    className={clsx(styles.button, styles.buttonOutline)}
                    text="Sign In"
                  />
                </Link>
              </div>
            )}
            {isAuth && (
              <div className={styles.searchWrapper}>
                <SimpleAutoFilter />
              </div>
            )}
          </div>
          <div className={styles.firstContainerRight}>
            <img src={Car} className={styles.car}></img>
          </div>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.secondContainerHeader}>New Cars</div>
          <div className={styles.secondContainerCards}>
            {cars &&
              cars?.map((car) => (
                <NewCarCard type="model" car={car} key={car.id} />
              ))}
          </div>
        </div>
        <div className={styles.thirdContainer}>
          <CarsCategories />
        </div>
        <div className={styles.fourthContainer}>
          <TopCarsAutoria />
        </div>
      </Container>
    </>
  );
};
