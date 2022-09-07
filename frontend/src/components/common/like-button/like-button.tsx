import { clsx } from 'clsx';

import { HeartIcon } from '../icons/icons';
import styles from './styles.module.scss';

type LikeButtonPropsType = {
  isLiked: boolean | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const LikeButtton: React.FC<LikeButtonPropsType> = ({ isLiked, onClick }) => {
  return (
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
  );
};

export { LikeButtton };
