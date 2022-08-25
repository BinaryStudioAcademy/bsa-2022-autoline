import { Link } from 'react-router-dom';

import Car from '@assets/images/landing-page/picture.png';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { CarsCategories } from '@components/cars-categories/cars-categories';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { NewCarCard } from '@components/new-car-card/new-car-card';
import { TopCarCard } from '@components/top-car-card/top-car-card';
import { Container } from '@mui/material';

import { Header } from './components/components';
import { newCars } from './mock-new-cars';
import styles from './styles.module.scss';

export const LandingPage = (): React.ReactElement => {
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
              We are the best service to look for cars with the best offers.
              Here you can buy or sell the car.
            </div>
            <div className={styles.firstContainerLeftButtons}>
              <Link to={AppRoute.SIGN_UP}>
                <ButtonFill
                  className={styles.buttonFill}
                  text="Create Account"
                />
              </Link>
              <Link to={AppRoute.SIGN_IN}>
                <ButtonOutline
                  className={styles.buttonOutline}
                  text="Sign In"
                />
              </Link>
            </div>
          </div>
          <div className={styles.firstContainerRight}>
            <img src={Car} className={styles.car}></img>
          </div>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.secondContainerHeader}>New Cars</div>
          <div className={styles.secondContainerCards}>
            {/*<NewCarCard />*/}
            {/*<NewCarCard />*/}
            {/*<NewCarCard />*/}
            {/*<NewCarCard />*/}
            {!newCars
              ? null
              : newCars?.map((car) => (
                  <NewCarCard
                    type={'complectation'}
                    isLiked={false}
                    car={car}
                    key={car.id}
                  />
                ))}
          </div>
        </div>
        <div className={styles.thirdContainer}>
          <CarsCategories />
        </div>
        <div className={styles.fourthContainer}>
          <div className={styles.fourthContainerHeader}>Top Autoria</div>
          <div className={styles.fourthContainerCards}>
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
            <TopCarCard />
          </div>
        </div>
      </Container>
    </>
  );
};
