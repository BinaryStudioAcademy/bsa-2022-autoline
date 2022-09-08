import { Mousewheel, Navigation, SwiperOptions } from 'swiper';

export const swiperParams: SwiperOptions = {
  loop: true,
  mousewheel: true,
  modules: [Navigation, Mousewheel],
  breakpoints: {
    320: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 4,
    },
    820: {
      slidesPerView: 5,
    },
    1080: {
      slidesPerView: 6,
    },
    1300: {
      slidesPerView: 8,
    },
  },
};
