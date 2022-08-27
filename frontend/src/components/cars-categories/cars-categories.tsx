import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Brand } from '@common/types/car-filter/brand.type';
import { mockBrands } from '@components/cars-categories/mock-brands';
import { SliderNavButton } from '@components/cars-categories/slider-nav-button/slider-nav-button';
import { swiperParams } from '@components/cars-categories/swiper-params';
import { useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const [brands] = useState<Brand[]>(mockBrands);
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMatchMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={styles.container}>
      <Swiper
        className={styles.swiperWrapper}
        {...swiperParams}
        slidesPerView={isMatchMd ? 8 : isMatchSm ? 3 : 5}
      >
        <SliderNavButton direction="prev" />
        <SliderNavButton direction="next" />

        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <Link to="#" className={styles.navLink}>
              <img
                className={styles.logo}
                src={brand.logo_url}
                alt={brand.name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export { CarsCategories };
