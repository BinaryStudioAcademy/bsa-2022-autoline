import { Link } from 'react-router-dom';

import Car from '@assets/images/landing-page/picture.png';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { CarsCategories } from '@components/cars-categories/cars-categories';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { PageContainer } from '@components/common/page-container/page-container';
import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
import { NewCarCard } from '@components/new-car-card/new-car-card';
import { SimpleAutoFilter } from '@components/simple-auto-filter/simple-auto-filter';
import { TopCarsAutoline } from '@components/top-cars-autoria/top-cars-autoline';
import { useAppSelector } from '@hooks/hooks';
import { useGetNewCarsQuery } from '@store/queries/new-cars';
import { useGetRecentSearchCarsQuery } from '@store/queries/recent-serach-cars';
import { selectAuthToken } from '@store/selectors';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const LandingPage = (): React.ReactElement => {
  const isAuth = useAppSelector(selectAuthToken);
  const { data: cars } = isAuth
    ? useGetRecentSearchCarsQuery(4)
    : useGetNewCarsQuery(4);
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.firstContainer}>
          <PageContainer className={styles.firstContainerInner}>
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
          </PageContainer>
        </div>
        <div className={styles.secondContainer}>
          <PageContainer>
            {cars?.length != 0 && (
              <div className={styles.secondContainerHeader}>
                {isAuth ? 'Recent Searches' : 'New Cars'}
              </div>
            )}
            <div className={styles.secondContainerCards}>
              {cars &&
                cars?.map((car) => (
                  <NewCarCard type="model" car={car} key={car.id} />
                ))}
            </div>
          </PageContainer>
        </div>
        <div className={styles.thirdContainer}>
          <PageContainer>
            <CarsCategories />
          </PageContainer>
        </div>
        <div className={styles.fourthContainer}>
          <PageContainer>
            <TopCarsAutoline />
          </PageContainer>
        </div>
      </div>
      <Footer />
    </>
  );
};
