import { useState } from 'react';

import ErrorIcon from '@assets/images/error.svg';
import PassIcon from '@assets/images/eye-slash.svg';
import { InputFieldPropsType } from '@common/types/types';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export const InputField = (props: InputFieldPropsType): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl
      variant="standard"
      className={clsx(
        styles.inputField,
        styles.fieldWrapper,
        props.errors && styles.inputFieldError,
      )}
    >
      {props.type === 'password' && (
        <img
          className={styles.icon}
          onClick={handleClickShowPassword}
          src={PassIcon}
          alt="icon"
        />
      )}
      <InputLabel className={styles.label}>{props.name}</InputLabel>
      <OutlinedInput
        name={props.name}
        type={props.type === 'password' && showPassword ? 'text' : props.type}
        className={styles.input}
        error={props.errors ? true : false}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errors && (
        <FormHelperText className={styles.error}>
          <img className={styles.errorIcon} src={ErrorIcon} alt="Error" />
          <span>{props.errors}</span>
        </FormHelperText>
      )}
    </FormControl>
  );
};
