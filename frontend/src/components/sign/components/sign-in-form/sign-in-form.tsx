import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { InputField } from '@components/common/input-field/input-field';
import Divider from '@mui/material/Divider';
import { useSignInMutation } from '@store/queries/auth';

import styles from './styles.module.scss';

export const SignInForm = (): React.ReactElement => {
  const [signIn, { isLoading }] = useSignInMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (): void => {
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
      <form name="signinForm" onSubmit={handleSubmit} className={styles.form}>
        <fieldset disabled={isLoading} className={styles.fieldset}>
          <InputField
            name="Email"
            type="email"
            required={true}
            errors={''}
            onChange={(event): void => setEmail(event.target.value)}
          />
          <InputField
            name="Password"
            type="password"
            required={true}
            errors={'Must be at least 8 characters'}
            onChange={(event): void => setPassword(event.target.value)}
          />
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
