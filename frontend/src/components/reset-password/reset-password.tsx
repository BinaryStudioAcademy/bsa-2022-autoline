import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordRequestData } from '@autoline/shared/common/types/types';
import { resetPassword as resetPasswordValidationSchema } from '@autoline/shared/validation-schemas/validation-schemas';
import { AppRoute } from '@common/enums/enums';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import { useAppForm } from '@hooks/hooks';
import { Alert } from '@mui/material';
import { useResetPasswordMutation } from '@store/queries/auth';

import { AuthWrapper } from '../common/auth-wrapper/auth-wrapper';
import { DEFAULT_RESET_PASSWORD_PAYLOAD } from './common';
import styles from './styles.module.scss';

export const ResetPassword = (): React.ReactElement => {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get('id') as string;
  useEffect(() => {
    if (!userId) {
      navigate(AppRoute.NOT_FOUND);
    }
  });

  const { control, errors, handleSubmit } =
    useAppForm<ResetPasswordRequestData>({
      defaultValues: DEFAULT_RESET_PASSWORD_PAYLOAD,
      validationSchema: resetPasswordValidationSchema,
    });
  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetPasswordMutation();

  const onSubmit = async ({
    password,
  }: ResetPasswordRequestData): Promise<void> => {
    await resetPassword({ id: userId, password }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(AppRoute.SIGN_IN);
    }
  });

  return (
    <AuthWrapper>
      <>
        <h1 className={styles.title}>reset your password</h1>
        <form
          name="resetpasswordForm"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <fieldset disabled={isLoading} className={styles.fieldset}>
            <InputField
              name="password"
              type="password"
              required={true}
              errors={errors}
              control={control}
              inputLabel="Password"
            />
            <InputField
              name="confirmPwd"
              type="password"
              required={true}
              errors={errors}
              control={control}
              inputLabel="Confirm Password"
            />
            {error && 'data' in error && (
              <Alert severity="error">{error.data.toString()}</Alert>
            )}
            <ButtonFill text="Submit" />
          </fieldset>
        </form>
      </>
    </AuthWrapper>
  );
};
