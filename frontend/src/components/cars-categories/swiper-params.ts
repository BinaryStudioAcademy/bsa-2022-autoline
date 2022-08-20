import { Mousewheel, Navigation, SwiperOptions } from 'swiper';

export const swiperParams: SwiperOptions = {
  // slidesPerView: 8,
  loop: true,
  mousewheel: true,
  modules: [Navigation, Mousewheel],
};
