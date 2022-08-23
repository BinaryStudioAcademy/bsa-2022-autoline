import { useController } from 'react-hook-form';

import ErrorIcon from '@assets/images/error.svg';
import { SelectFieldPropsType } from '@common/types/types';
import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import Select from '@mui/material/Select';
import { clsx } from 'clsx';

import { ArrowDown } from '../icons/icons';
import styles from './styles.module.scss';

export const SelectField = (
  props: SelectFieldPropsType,
): React.ReactElement => {
  const {
    field: { ...field },
  } = useController({ name: props.name, control: props.control });

  return (
    <FormControl
      variant="standard"
      className={clsx(
        styles.selectField,
        styles.fieldWrapper,
        props.errors && styles.selectFieldError,
      )}
    >
      <InputLabel className={styles.label}>{props.name}</InputLabel>
      <Select
        id={props.id}
        label={props.label}
        variant="outlined"
        className={clsx(styles.select, styles.selectOutlined)}
        IconComponent={ArrowDown}
        {...field}
      >
        {props.children}
      </Select>

      {props.errors && (
        <FormHelperText className={styles.error}>
          <img className={styles.errorIcon} src={ErrorIcon} alt="Error" />
          <span>{props.errors}</span>
        </FormHelperText>
      )}
    </FormControl>
  );
};
