import { ButtonPropsType } from '@common/types/types';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const ButtonOutline = (props: ButtonPropsType): React.ReactElement => {
  return (
    <button
      className={clsx(props.className, styles.btnOutline)}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
