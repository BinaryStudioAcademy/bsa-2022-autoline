import React, { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { SignUpRequestData } from '@autoline/shared/common/types/types';
import { signUpSchema as baseSchema } from '@autoline/shared/validation-schemas';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { StorageKey } from '@common/enums/enums';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import { SignWithOAuth } from '@components/sign/components/sign-with-oauth/sign-with-oauth';
import { useAppForm } from '@hooks/hooks';
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
    .required('Please, repeat the password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const SignUpForm = (): React.ReactElement => {
  const { control, errors, handleSubmit } = useAppForm<SignUpRequestData>({
    defaultValues: {},
    validationSchema: signUpSchema,
  });

  const navigate = useNavigate();
  const [signUp, { isLoading, isSuccess, isError, error: signUpError }] =
    useSignUpMutation();
  const signUpErrorData = signUpError as ErrorType;

  const onSubmit = (formData: FieldValues): void => {
    const { name, email, password } = formData;
    const stringName = name as string;
    const stringEmail = email as string;
    const stringpassword = password as string;
    signUp({
      name: stringName,
      email: stringEmail,
      password: stringpassword,
    } as SignUpRequestData);
  };

  const navigateToSignIn = (): void => {
    navigate(AppRoute.SIGN_IN);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem(StorageKey.VERIFICATION_LINK, 'sent');
    }
  }, [isSuccess]);

  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <p className={styles.subtitle}>
        <span>Already have an account? </span>
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
          <InputField
            name="name"
            type="text"
            required={true}
            errors={errors}
            control={control}
            inputLabel="Full name"
          />

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

          <InputField
            name="repeatPassword"
            type="password"
            required={true}
            errors={errors}
            control={control}
            inputLabel="Repeat Password"
          />

          {isError && (
            <Alert
              className={styles.alert}
              severity="error"
            >{`${signUpErrorData.data.message}`}</Alert>
          )}

          <Dialog
            open={isSuccess}
            onClose={navigateToSignIn}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>{'Successful registration'}</DialogTitle>
            <DialogContent>
              <DialogContentText className={styles.dialogContentText}>
                Registration is successfully completed, you can sign in. Please
                verify your e-mail in order to use full functionality of the
                website.
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
          <SignWithOAuth title={'Google'} />
          <SignWithOAuth title={'Facebook'} />
        </div>
      </div>
    </>
  );
};
