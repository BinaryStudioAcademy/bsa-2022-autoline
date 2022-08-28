import React, { useState } from 'react';

import new_car_1 from '@assets/images/mock_car_picture.png';
import { CompleteSetDataType } from '@common/types/types';
import { SliderNavButton } from '@components/car-list-item/slider-nav-button/slider-nav-button';
import { swiperParams } from '@components/car-list-item/swiper-params';
import { CompleteSetTable } from '@components/complete-set-table/complete-set-table';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Grid } from '@mui/material';
import { clsx } from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';

import { mockCars } from './mock-cars';
import styles from './styles.module.scss';

const CarListItem: React.FC = () => {
  const [cars] = useState<CompleteSetDataType[]>(mockCars);
  const initialRows = 5;
  const rowsHidden = cars.length - initialRows;
  const [carsDisplayed, setCarsDisplayed] = useState(
    cars.slice(0, initialRows),
  );
  const [open, setOpen] = React.useState(false);

  const handleClick = (): void => {
    open
      ? setCarsDisplayed(cars.slice(0, initialRows))
      : setCarsDisplayed(cars);
    setOpen(!open);
  };
  return (
    <div className={styles.listCard}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <Swiper
            className={styles.swiperWrapper}
            {...swiperParams}
            slidesPerView={1}
          >
            <SliderNavButton direction="prev" />
            <SliderNavButton direction="next" />

            <SwiperSlide className={styles.slide}>
              <img src={new_car_1} alt="car" />
            </SwiperSlide>
          </Swiper>
          <div className={styles.carInfo}>
            <div className={styles.infoRow}>
              <p className={styles.title}>Engine</p>
              <p className={styles.option}>3 / 3.5 / 4 / 5 l.</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.title}>Engine power</p>
              <p className={styles.option}>185 / 205 / 231 h.p.</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.title}>Drivetrain</p>
              <p className={styles.option}>All-Wheel Drive (AWD)</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.title}>Fuel type</p>
              <p className={styles.option}>Diesel</p>
            </div>
            <div className={styles.infoRow}>
              <p className={styles.title}>Transmission type</p>
              <p className={styles.option}>Automatic</p>
            </div>
          </div>
        </Grid>
        <Grid item sm={8}>
          <h4 className={styles.carTitle}>BMW X5 m50d sport</h4>
          <div className={styles.priceBlock}>
            <h4 className={styles.primaryPrice}>$ 34 000 - 52 450</h4>
            <span className={styles.secondaryPrice}>
              UAH 1 554 000 - 1 945 450
            </span>
          </div>
          <div className={clsx(styles.options, 'styledScrollbar')}>
            <button className={styles.pillButton}>Leather Interior</button>
            <button className={styles.pillButton}>LED Headlight</button>
            <button className={styles.pillButton}>Crossover</button>
            <button className={styles.pillButton}>LCD screen</button>
            <button className={styles.pillButton}>VSM</button>
            <button className={styles.pillButton}>ABS</button>
            <button className={styles.pillButton}>
              Recognition of road signs
            </button>
          </div>
          <div className={styles.tableWrapper}>
            <Collapse in={open} timeout="auto" collapsedSize="290px">
              <CompleteSetTable
                data={carsDisplayed}
                className={clsx(styles.table, 'styledScrollbar')}
              />
            </Collapse>
            <button className={styles.collapseButton} onClick={handleClick}>
              + {rowsHidden} {open ? <ExpandLess /> : <ExpandMore />}
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export { CarListItem };
