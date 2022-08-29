import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { StorageKey } from '@common/enums/enums';
import { SignInRequestData } from '@common/types/types';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import { SignWithOAuth } from '@components/sign/components/sign-with-oauth/sign-with-oauth';
import { useAppForm } from '@hooks/hooks';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { useSignInMutation } from '@store/queries/auth';
import { setCredentials } from '@store/root-reducer';
import { signInSchema as signInValidationSchema } from '@validation-schemas/validation-schemas';
import { clsx } from 'clsx';

import { DEFAULT_SIGN_IN_PAYLOAD } from './common';
import styles from './styles.module.scss';

import type { SignInResponseData } from '@autoline/shared';

export const SignInForm = (): React.ReactElement => {
  const { control, errors, handleSubmit } = useAppForm<SignInRequestData>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: signInValidationSchema,
  });
  const [signIn, { isLoading, error }] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogin = ({ email, password }: SignInRequestData): void => {
    const user = {
      user: {
        email,
        password,
      },
    };
    signIn(user)
      .unwrap()
      .then(({ accessToken }: SignInResponseData) => {
        localStorage.setItem(StorageKey.TOKEN, accessToken);
        dispatch(setCredentials({ accessToken }));
        navigate(AppRoute.ROOT);
      });
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
            inputLabel="Email"
          />
          <InputField
            name="password"
            type="password"
            required={true}
            errors={errors}
            control={control}
            inputLabel="Password"
          />

          <Link
            to={AppRoute.FORGOT_PASSWORD}
            className={clsx(styles.link, styles.forgotPassword)}
          >
            Forgot password?
          </Link>

          {error && 'data' in error && (
            <Alert className={styles.alert} severity="error">
              {error.data.message}
            </Alert>
          )}
          <ButtonFill text="Sign In" />
        </fieldset>
      </form>
      <div className={styles.formBottom}>
        <Divider className={styles.divider}>or</Divider>
        <div className={styles.buttonsGroup}>
          <SignWithOAuth title={'Google'} />
          <SignWithOAuth title={'Facebook'} />
        </div>
      </div>
    </>
  );
};
