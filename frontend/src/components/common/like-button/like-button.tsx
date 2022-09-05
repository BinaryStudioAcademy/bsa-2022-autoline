import { LikeButtonPropsType } from '@common/types/types';
import { clsx } from 'clsx';

import { HeartIcon } from '../icons/icons';
import styles from './styles.module.scss';

const LikeButtton: React.FC<LikeButtonPropsType> = ({ isLiked, onClick }) => {
  return (
    <>
      <button
        className={clsx(
          styles.button,
          styles.iconButton,
          isLiked && styles.isLiked,
        )}
        onClick={onClick}
      >
        <HeartIcon />
      </button>
    </>
  );
};

export { LikeButtton };
