import { useController } from 'react-hook-form';

import ErrorIcon from '@assets/images/error.svg';
import { ArrowDown } from '@components/common/icons/icons';
import { SelectFieldFormPropsType } from '@components/edit-profile/select-field-form/select-field-form.type';
import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import Select from '@mui/material/Select';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const SelectFieldForm = (
  props: SelectFieldFormPropsType,
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
      disabled={props.disabled}
    >
      <InputLabel className={styles.label}>{props.label}</InputLabel>
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
