import React, { FC } from 'react';

import { useSwiper } from 'swiper/react';

import styles from './styles.module.scss';

type Props = {
  direction: 'prev' | 'next';
};

const SliderNavButton: FC<Props> = ({ direction }) => {
  const swiper = useSwiper();

  const classButton =
    direction === 'prev' ? styles.prevButton : styles.nextButton;

  const clickHandler = (event: React.MouseEvent): void => {
    event.stopPropagation();
    if (direction === 'prev') {
      swiper.slidePrev();
    }
    swiper.slideNext();
  };

  return (
    <button
      className={`${styles.button} ${classButton}`}
      onClick={clickHandler}
    />
  );
};

export { SliderNavButton };
