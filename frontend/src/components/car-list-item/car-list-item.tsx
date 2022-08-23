import React from 'react';

import new_car_1 from '@assets/images/mock_car_picture.png';
import { SliderNavButton } from '@components/cars-categories/slider-nav-button/slider-nav-button';
import { swiperParams } from '@components/cars-categories/swiper-params';
import { Title } from '@components/common/title/title';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

const CarListItem: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = (): void => {
    setOpen(!open);
  };
  return (
    <div className={styles.listCard}>
      <Grid container spacing={2}>
        <Grid item sm={3}>
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
          Info
        </Grid>
        <Grid item sm={9}>
          <Title className={styles.carTitle} element="h4">
            BMW X5 m50d sport
          </Title>
          <div>Price</div>
          <div>Table</div>
          <div className={styles.complectationsTable}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse leo risus, molestie ut ipsum ac, suscipit maximus
                erat. Proin dapibus pellentesque purus, suscipit aliquam mauris
                accumsan ac. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Morbi porttitor dui nec imperdiet dapibus. Nunc hendrerit
                nibh facilisis diam lobortis, a aliquet lacus gravida. Etiam
                egestas nisi sit amet vehicula placerat. Donec finibus purus
                quis arcu porttitor, id dictum ante pretium.
              </p>
            </Collapse>
            <button className={styles.expander} onClick={handleClick}>
              +3 {open ? <ExpandLess /> : <ExpandMore />}
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export { CarListItem };
