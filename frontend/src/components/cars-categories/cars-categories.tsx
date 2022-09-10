import React, { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SliderNavButton } from '@components/cars-categories/slider-nav-button/slider-nav-button';
import { swiperParams } from '@components/cars-categories/swiper-params';
import { useAppSelector, useAppDispatch } from '@hooks/hooks';
import { setBrandDetailsValue } from '@store/car-filter/slice';
import { setCars } from '@store/found-car/slice';
import { API } from '@store/queries/api-routes';
import {
  useLazyGetFilteredCarsQuery,
  useGetBrandsQuery,
} from '@store/queries/cars';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

import styles from './styles.module.scss';

const CarsCategories: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { brandDetails } = useAppSelector((state) => state.carFilter);
  const { id: detailId } = brandDetails[0];
  const { data: brands } = useGetBrandsQuery();
  const [search, filteredCars] = useLazyGetFilteredCarsQuery();

  useEffect(() => {
    if (filteredCars.data) {
      dispatch(setCars(filteredCars.data));
    }
  }, [filteredCars]);

  const doSearch = async (queryParams: string[][]): Promise<void> => {
    dispatch(
      setBrandDetailsValue({
        id: detailId,
        brandId: queryParams[0][1] || '',
        modelIds: [],
      }),
    );
    await search(queryParams);
    navigate(API.SEARCH);
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrowWrapper}>
        <Swiper className={styles.swiperWrapper} {...swiperParams}>
          <SliderNavButton direction="prev" />
          <SliderNavButton direction="next" />

          {brands?.map((brand) => (
            <SwiperSlide
              key={brand.id}
              onClick={(): Promise<void> => doSearch([['brandId', brand.id]])}
            >
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
    </div>
  );
};

export { CarsCategories };
