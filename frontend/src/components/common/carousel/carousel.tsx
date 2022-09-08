import 'swiper/css/bundle';
import './styles.scss';
import React, { useState } from 'react';

import IconPark from '@assets/images/icon-park-solid_picture.svg';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import type { Swiper as SwiperType } from 'swiper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Carousel = (props: { images: string[] }): React.ReactElement => {
  const { images } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [currentImage, setCurrentImage] = useState(1);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        onSlideChange={({ activeIndex }): void => {
          setCurrentImage(activeIndex + 1);
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mainSwiper"
      >
        <div className="navigation-bar">
          <img src={IconPark} />
          <div className="current-image">
            {currentImage} / {images.length}
          </div>
        </div>
        {images.map((image) => {
          return (
            <SwiperSlide>
              <img src={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbsSwiper"
        onSlideChange={({ clickedIndex }): void => {
          if (clickedIndex) setCurrentImage(clickedIndex + 1);
        }}
      >
        {images.map((image) => {
          return (
            <SwiperSlide>
              <img src={image} />
              <div className="swiper-underline"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
