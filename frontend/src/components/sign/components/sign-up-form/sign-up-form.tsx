import React from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { signUpSchema as baseSchema } from '@autoline/shared/validation-schemas';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { InputField } from '@components/common/input-field/input-field';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { ErrorType } from '@store/queries';
import { useSignUpMutation } from '@store/queries/auth';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const signUpSchema = baseSchema.shape({
  repeatPassword: Yup.string()
    .required('Repeat password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const SignUpForm = (): React.ReactElement => {
  const navigate = useNavigate();
  const [fetchSignUp, { isLoading, isSuccess, isError, error: fetchError }] =
    useSignUpMutation();
  const fetchErrorData = fetchError as ErrorType;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (formData: FieldValues): void => {
    const { name, email, password, phone, location } = formData;
    fetchSignUp({ name, email, password, phone, location });
  };

  const navigateToSignIn = (): void => {
    navigate('../sign-in');
  };

  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <p className={styles.subtitle}>
        <span>I have an account? </span>
        <Link className={styles.link} to={AppRoute.SIGN_IN}>
          Sign In
        </Link>
      </p>
      <form
        name="signupForm"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <fieldset disabled={isLoading} className={styles.fieldset}>
          <Controller
            name={'name'}
            control={control}
            render={({ field: { onChange, value } }): React.ReactElement => (
              <InputField
                name="Full name"
                type="text"
                required={true}
                errors={errors.name ? `${errors.name.message}` : ''}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name={'email'}
            control={control}
            render={({ field: { onChange, value } }): React.ReactElement => (
              <InputField
                name="Email"
                type="email"
                required={true}
                errors={errors.email ? `${errors.email.message}` : ''}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name={'password'}
            control={control}
            render={({ field: { onChange, value } }): React.ReactElement => (
              <InputField
                name="Password"
                type="password"
                required={true}
                errors={errors.password ? `${errors.password.message}` : ''}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name={'repeatPassword'}
            control={control}
            render={({ field: { onChange, value } }): React.ReactElement => (
              <InputField
                name="Repeat Password"
                type="password"
                required={true}
                errors={
                  errors.repeatPassword
                    ? `${errors.repeatPassword.message}`
                    : ''
                }
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name={'phone'}
            control={control}
            render={({ field: { onChange, value } }): React.ReactElement => (
              <InputField
                name="Phone"
                type="tel"
                required={false}
                errors={''}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name={'location'}
            control={control}
            render={({ field: { onChange, value } }): React.ReactElement => (
              <InputField
                name="Location"
                type="text"
                required={false}
                errors={''}
                value={value}
                onChange={onChange}
              />
            )}
          />

          {isError && (
            <Alert
              className={styles.alert}
              severity="error"
            >{`${fetchErrorData.data.error}`}</Alert>
          )}

          <Dialog
            open={isSuccess}
            onClose={navigateToSignIn}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Registration successful'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Registration completed successfully, you can sign in. To verify
                your email in order to use the full functionality of the site.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={navigateToSignIn} autoFocus>
                Sign In
              </Button>
            </DialogActions>
          </Dialog>

          <ButtonFill text="Create Account" />
        </fieldset>
      </form>
      <div className={styles.formBottom}>
        <Divider className={styles.divider}>or</Divider>
        <div className={styles.buttonsGroup}>
          <ButtonOutline text="Sign Up with Google" />
          <ButtonOutline text="Sign Up with Facebook" />
        </div>
      </div>
    </>
  );
};
