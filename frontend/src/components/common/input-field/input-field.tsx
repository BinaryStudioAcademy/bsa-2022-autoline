import React, { useState, FC } from 'react';
import { useController } from 'react-hook-form';

import ErrorIcon from '@assets/images/error.svg';
import { InputFieldPropsType } from '@common/types/types';
import { ErrorMessage } from '@hookform/error-message';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { clsx } from 'clsx';

// import { PhoneMask } from './input-masks/phone-mask/phone-mask';
import styles from './styles.module.scss';

const InputField: FC<InputFieldPropsType> = ({
  name,
  control,
  type,
  errors,
  inputLabel,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
  };

  const iconSize = { width: 18, height: 18 };

  const {
    field: { ...field },
  } = control ? useController({ name, control }) : { field: { onChange } };

  return (
    <FormControl
      variant="standard"
      className={clsx(
        styles.inputField,
        styles.fieldWrapper,
        errors?.[name] && styles.inputFieldError,
      )}
    >
      <InputLabel className={styles.label}>{inputLabel}</InputLabel>
      <OutlinedInput
        {...field}
        type={type === 'password' && showPassword ? 'text' : type}
        className={styles.input}
        error={errors?.[name] ? true : false}
        // inputComponent={type === 'tel' ? PhoneMask : undefined}
        endAdornment={
          type === 'password' ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? (
                  <VisibilityOffIcon style={iconSize} />
                ) : (
                  <VisibilityIcon style={iconSize} />
                )}
              </IconButton>
            </InputAdornment>
          ) : undefined
        }
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

InputField.defaultProps = {
  type: 'text',
  required: false,
  // errors: [],
};

export { InputField };
