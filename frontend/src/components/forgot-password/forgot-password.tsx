import React, { useState } from 'react';

import { ForgotPasswordRequestData } from '@autoline/shared/common/types/types';
import { forgotPassword as forgotPasswordValidationSchema } from '@autoline/shared/validation-schemas/validation-schemas';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import { useAppForm } from '@hooks/hooks';
import { Alert } from '@mui/material';
import { useForgotPasswordMutation } from '@store/queries/auth';

import { AuthWrapper } from '../common/auth-wrapper/auth-wrapper';
import { DEFAULT_FORGOT_PASSWORD_PAYLOAD } from './common';
import styles from './styles.module.scss';

export const ForgotPassword = (): React.ReactElement => {
  const { control, errors, handleSubmit } =
    useAppForm<ForgotPasswordRequestData>({
      defaultValues: DEFAULT_FORGOT_PASSWORD_PAYLOAD,
      validationSchema: forgotPasswordValidationSchema,
    });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [isSubmitted, setSubmitted] = useState(false);
  const onSubmit = ({ email }: ForgotPasswordRequestData): void => {
    setSubmitted(true);
    forgotPassword(email).unwrap();
  };

  return (
    <AuthWrapper>
      <>
        <h1 className={styles.title}>Trouble signing in?</h1>
        <p className={styles.subtitle}>
          <span>
            Don't worry, we've got your back! Just enter your email address and
            we'll send you a link with which you can reset your password.
          </span>
        </p>
        <form
          name="forgotpasswordForm"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <fieldset disabled={isLoading} className={styles.fieldset}>
            <InputField
              name="email"
              type="email"
              required={true}
              errors={errors}
              control={control}
              inputLabel="Email"
            />
            {isSubmitted ? (
              <Alert severity="info">
                If you are a registered user, you will soon receive a recovery
                link. Please check your inbox.
              </Alert>
            ) : null}
            <ButtonFill text="Submit" disabled={isSubmitted} />
          </fieldset>
        </form>
      </>
    </AuthWrapper>
  );
};
