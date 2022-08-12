import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { mockBrands } from '@components/cars-categories/mock-brands';
import { SliderNavButton } from '@components/cars-categories/slider-nav-button/slider-nav-button';
import { swiperParams } from '@components/cars-categories/slider-nav-button/swiper-params';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

import { Brand } from '../../types/brand.type';
import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const [brands] = useState<Brand[]>(mockBrands);

  return (
    <div className={styles.container}>
      <Swiper className={styles.swiperWrapper} {...swiperParams}>
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
