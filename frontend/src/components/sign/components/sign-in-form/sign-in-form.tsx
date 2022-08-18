import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { SignInRequestData } from '@common/types/types';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { InputField } from '@components/common/input-field/input-field';
import { useAppForm } from '@hooks/hooks';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { useSignInMutation } from '@store/queries/auth';
import { signInSchema as signInValidationSchema } from '@validation-schemas/validation-schemas';

import { DEFAULT_SIGN_IN_PAYLOAD } from './common';
import styles from './styles.module.scss';

export const SignInForm = (): React.ReactElement => {
  const { control, errors, handleSubmit } = useAppForm<SignInRequestData>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: signInValidationSchema,
  });
  const [signIn, { isLoading, error }] = useSignInMutation();
  const onLogin = ({ email, password }: SignInRequestData): void => {
    const user = {
      user: {
        email,
        password,
      },
    };
    signIn(user).unwrap();
  };
  return (
    <>
      <h1 className={styles.title}>Sign In</h1>
      <p className={styles.subtitle}>
        <span>Don't have an account? </span>
        <Link className={styles.link} to={AppRoute.SIGN_UP}>
          Sign Up
        </Link>
      </p>
      <form
        name="signinForm"
        onSubmit={handleSubmit(onLogin)}
        className={styles.form}
      >
        <fieldset disabled={isLoading} className={styles.fieldset}>
          <InputField
            name="email"
            type="email"
            required={true}
            errors={errors}
            control={control}
            label="Email"
          />
          <InputField
            name="password"
            type="password"
            required={true}
            errors={errors}
            control={control}
            label="Password"
          />
          {error && 'data' in error && (
            <Alert severity="error">{error.data.message}</Alert>
          )}
          <ButtonFill text="Sign In" />
        </fieldset>
      </form>
      <div className={styles.formBottom}>
        <Divider className={styles.divider}>or</Divider>
        <div className={styles.buttonsGroup}>
          <ButtonOutline text="Sign In with Google" />
          <ButtonOutline text="Sign In with Facebook" />
        </div>
      </div>
    </>
  );
};
