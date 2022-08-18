import React, { useState, FC } from 'react';
import { useController } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

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

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+38 (000) 000-00-00"
        inputRef={ref}
        onAccept={(value: unknown): void =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

export const InputField: FC<InputFieldPropsType> = ({
  name,
  control,
  type,
  errors,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

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
        <img
          className={styles.icon}
          onClick={handleClickShowPassword}
          src={PassIcon}
          alt="icon"
        />
      )}

      <InputLabel className={styles.label}>{label}</InputLabel>
      <OutlinedInput
        {...field}
        type={type === 'password' && showPassword ? 'text' : type}
        className={styles.input}
        error={errors?.[name] ? true : false}
        inputComponent={type === 'tel' ? TextMaskCustom : undefined}
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
