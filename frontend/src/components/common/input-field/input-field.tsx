import { FC } from 'react';
import { useController } from 'react-hook-form';

import ErrorIcon from '@assets/images/error.svg';
import PassIcon from '@assets/images/eye-slash.svg';
import { InputFieldPropsType } from '@common/types/types';
import { ErrorMessage } from '@hookform/error-message';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const InputField: FC<InputFieldPropsType> = ({
  name,
  control,
  type,
  errors,
  inputLabel,
  // onChange,
}) => {
  const {
    field: { ...field },
  } = useController({ name, control });
  return (
    <FormControl
      variant="standard"
      className={clsx(
        styles.inputField,
        styles.fieldWrapper,
        errors?.[name] && styles.inputFieldError,
      )}
    >
      {type === 'password' && (
        <img className={styles.icon} src={PassIcon} alt="icon" />
      )}
      <InputLabel className={styles.label}>{inputLabel ?? name}</InputLabel>
      <OutlinedInput
        {...field}
        type={type}
        className={styles.input}
        error={errors?.[name] ? true : false}
        // onChange={onChange}
      />
      {errors?.[name] && (
        <FormHelperText className={styles.error}>
          <img className={styles.errorIcon} src={ErrorIcon} alt="Error" />
          <span>
            <ErrorMessage errors={errors} name={name} />
          </span>
        </FormHelperText>
      )}
    </FormControl>
  );
};
