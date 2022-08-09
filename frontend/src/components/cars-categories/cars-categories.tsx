import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { mockBrands } from '@components/cars-categories/mock-brands';
import { Mousewheel, Navigation, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Brand } from '../../types/brand.type';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const [brands] = useState<Brand[]>(mockBrands);

  const swiperParams: SwiperOptions = {
    slidesPerView: 8,
    loop: true,
    mousewheel: true,
    navigation: true,
    modules: [Navigation, Mousewheel],
  };

  return (
    <Swiper className={styles.container} {...swiperParams}>
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
  );
};

export { CarsCategories };
