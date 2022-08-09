import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { mockBrands } from '@components/cars-categories/mock-brands';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Brand } from '../../types/brand.type';
import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const [brands] = useState<Brand[]>(mockBrands);

  return (
    <Swiper
      className={styles.container}
      modules={[Navigation]}
      slidesPerView={6}
      navigation={true}
    >
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
