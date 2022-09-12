import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { SliderNavButton } from '@components/cars-categories/slider-nav-button/slider-nav-button';
import { swiperParams } from '@components/cars-categories/swiper-params';
import { useGetBrandsQuery } from '@store/queries/cars';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const { data: brands } = useGetBrandsQuery();

  return (
    <div className={styles.container}>
      <div className={styles.arrowWrapper}>
        <Swiper className={styles.swiperWrapper} {...swiperParams}>
          <SliderNavButton direction="prev" />
          <SliderNavButton direction="next" />

          {brands?.map((brand) => (
            <SwiperSlide key={brand.id}>
              <Link to={`/search?brand=${brand.id}`} className={styles.navLink}>
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
    </div>
  );
};

export { CarsCategories };
