import React, { FC, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { SliderNavButton } from '@components/cars-categories/slider-nav-button/slider-nav-button';
import { swiperParams } from '@components/cars-categories/swiper-params';
import { Spinner } from '@components/common/spinner/spinner';
import { useGetBrandsQuery } from '@store/queries/cars';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const { data: brands } = useGetBrandsQuery();

  const countOrAllExisted = useCallback(
    (count: number): number => {
      if (!brands) return count;
      return brands?.length >= count ? count : brands?.length;
    },
    [brands],
  );

  const breakpoints = useMemo(
    () =>
      brands && {
        320: {
          slidesPerView: countOrAllExisted(3),
        },
        640: {
          slidesPerView: countOrAllExisted(4),
        },
        820: {
          slidesPerView: countOrAllExisted(5),
        },
        1080: {
          slidesPerView: countOrAllExisted(6),
        },
        1300: {
          slidesPerView: countOrAllExisted(8),
        },
      },
    [brands],
  );

  if (!brands) return <Spinner />;

  return (
    <div className={styles.container}>
      <div className={styles.arrowWrapper}>
        <Swiper
          className={styles.swiperWrapper}
          {...swiperParams}
          breakpoints={breakpoints}
        >
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
