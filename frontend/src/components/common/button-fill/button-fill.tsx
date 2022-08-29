import { ButtonPropsType } from '@common/types/types';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const ButtonFill = (props: ButtonPropsType): React.ReactElement => {
  return (
    <button
      className={clsx(props.className, styles.btnFill)}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </button>
  );
};
