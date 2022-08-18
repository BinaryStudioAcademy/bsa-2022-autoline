import { useState } from 'react';

import Audi from '@assets/images/landing-page/audi.png';
import BMW from '@assets/images/landing-page/bmw.png';
import Chery from '@assets/images/landing-page/chery.png';
import Kia from '@assets/images/landing-page/kia.png';
import Mazda from '@assets/images/landing-page/mazda.png';
import Car from '@assets/images/landing-page/picture.png';
import Porsche from '@assets/images/landing-page/porsche.png';
import Subaru from '@assets/images/landing-page/subaru.png';
import Volkswagen from '@assets/images/landing-page/volkswagen.png';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { NewCarCard } from '@components/new-car-card/new-car-card';
import { TopCarCard } from '@components/top-car-card/top-car-card';
import { Box, Container, Tab, Tabs, tabsClasses } from '@mui/material';

import { Header } from './components/components';

import './styles.scss';

export const LandingPage = (): React.ReactElement => {
  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

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
              <ButtonFill className="button buttonFill" text="Create Account" />
              <ButtonOutline className="button buttonOutline" text="Sign In" />
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
          <Box
            sx={{
              // flexGrow: 1,
              // maxWidth: { xs: 320, sm: 480 },
              bgcolor: 'background.paper',
              // height: '150px',
            }}
            className="third-container-box"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
            >
              <Tab icon={<img src={BMW} />} />
              <Tab icon={<img src={Audi} />} />
              <Tab icon={<img src={Subaru} />} />
              <Tab icon={<img src={Porsche} />} />
              <Tab icon={<img src={Mazda} />} />
              <Tab icon={<img src={Chery} />} />
              <Tab icon={<img src={Volkswagen} />} />
              <Tab icon={<img src={Kia} />} />
              <Tab icon={<img src={BMW} />} />
              <Tab icon={<img src={Audi} />} />
              <Tab icon={<img src={Subaru} />} />
              <Tab icon={<img src={Porsche} />} />
              <Tab icon={<img src={Mazda} />} />
              <Tab icon={<img src={Chery} />} />
              <Tab icon={<img src={Volkswagen} />} />
              <Tab icon={<img src={Kia} />} />
            </Tabs>
          </Box>
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
