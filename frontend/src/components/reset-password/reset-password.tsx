import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import { useResetPasswordMutation } from '@store/queries/forgot-password';

import { resetPassword as resetPasswordSchema } from '../../../../shared/src/validation-schemas/validation-schemas';
import Logo from '../../assets/images/logo.svg';
import BgImage from '../../assets/images/sign-bg.jpg';
import styles from './styles.module.scss';

export const ResetPassword = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [backendError, setBackendError] = useState('');
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any): Promise<any> => {
    setBackendError('');
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id');
    await resetPassword({ id: userId!, password: data.confirmPwd })
      .unwrap()
      .then(() => navigate('/sign-in'))
      .catch((error) => {
        setBackendError(error.data);
      });
  };

  const sectionStyle = {
    backgroundImage: `url(${BgImage})`,
  };

  return (
    <div style={sectionStyle} className={styles.bgImage}>
      <Container className={styles.wrapper}>
        <div className={styles.wrapperInner}>
          <div className={styles.content}>
            <Link to={AppRoute.ROOT}>
              <img className={styles.logo} src={Logo} alt="Autoline" />
            </Link>
            <h1 className={styles.title}>reset your password</h1>
            <form
              name="resetpasswordForm"
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
            >
              <fieldset disabled={isLoading} className={styles.fieldset}>
                <InputField
                  name="Password"
                  registerName="password"
                  type="password"
                  required={true}
                  errors={errors.password?.message}
                  register={register}
                />
                <InputField
                  name="Confirm password"
                  registerName="confirmPwd"
                  type="password"
                  required={true}
                  errors={errors.confirmPwd?.message}
                  register={register}
                />
                {backendError ? (
                  <Alert severity="error">{backendError}</Alert>
                ) : null}
                <ButtonFill text="Submit" />
              </fieldset>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};
