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

import './styles.scss';

export const LandingPage = (): React.ReactElement => {
  return (
    <>
      <Header />
      <Container
        sx={{ maxWidth: '100% !important' }}
        className="main-container"
      >
        <div className="first-container">
          <div className="first-container-left">
            <div className="first-container-left-text-main">
              find a car
              <br />
              at your price
            </div>
            <div className="first-container-left-text-secondary">
              We are the best service to look for cars with the best offers.
              Here you can buy or sell the car.
            </div>
            <div className="first-container-left-buttons">
              <Link to={AppRoute.SIGN_UP}>
                <ButtonFill
                  className="button buttonFill"
                  text="Create Account"
                />
              </Link>
              <Link to={AppRoute.SIGN_IN}>
                <ButtonOutline
                  className="button buttonOutline"
                  text="Sign In"
                />
              </Link>
            </div>
          </div>
          <div className="first-container-right">
            <img src={Car} className="car"></img>
          </div>
        </div>
        <div className="second-container">
          <div className="second-container-header">New Cars</div>
          <div className="second-container-cards">
            <NewCarCard />
            <NewCarCard />
            <NewCarCard />
            <NewCarCard />
          </div>
        </div>
        <div className="third-container">
          <CarsCategories />
        </div>
        <div className="fourth-container">
          <div className="fourth-container-header">Top Autoria</div>
          <div className="fourth-container-cards">
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
