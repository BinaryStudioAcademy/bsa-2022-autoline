import { TitlePropsType } from '@common/types/types';

import styles from './styles.module.scss';

export const Title = (props: TitlePropsType): React.ReactElement => {
  return (
    <props.element className={styles.title}>{props.children}</props.element>
  );
};
