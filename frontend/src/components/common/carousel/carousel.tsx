import 'swiper/css/bundle';
import './styles.css';
import React, { useState } from 'react';

import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import IconPark from './icon-park-solid_picture.svg';

import type { Swiper as SwiperType } from 'swiper';

export const Carousel = (): React.ReactElement => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [currentImage, setCurrentImage] = useState(1);

  const images = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
    'https://swiperjs.com/demos/images/nature-6.jpg',
    'https://swiperjs.com/demos/images/nature-7.jpg',
    'https://swiperjs.com/demos/images/nature-8.jpg',
    'https://swiperjs.com/demos/images/nature-9.jpg',
    'https://swiperjs.com/demos/images/nature-10.jpg',
  ];

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        onSlideChange={({ activeIndex }): void =>
          setCurrentImage(activeIndex + 1)
        }
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
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
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        onSlideChange={({ activeIndex }): void =>
          setCurrentImage(activeIndex + 1)
        }
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
