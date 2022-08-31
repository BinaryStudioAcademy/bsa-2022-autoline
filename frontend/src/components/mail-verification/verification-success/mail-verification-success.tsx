import { FC } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app';
import { StorageKey } from '@common/enums/enums';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import Container from '@mui/material/Container';

import styles from './styles.module.scss';

const MailVerificationSuccess: FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickHandler = (): void => {
    navigate(AppRoute.SIGN_IN);
    localStorage.removeItem(StorageKey.VERIFICATION_LINK);
  };

  const isLinkSent = localStorage.getItem(StorageKey.VERIFICATION_LINK);

  if (isLinkSent !== 'sent') {
    return (
      <Navigate to={AppRoute.SIGN_IN} replace state={{ from: location }} />
    );
  }

  return (
    <div className={styles.bgImage}>
      <Container className={styles.wrapper}>
        <div className={styles.wrapperInner}>
          <div className={styles.content}>
            <button className={styles.logoButton} onClick={onClickHandler}>
              <img className={styles.logo} src={Logo} alt="Autoline" />
            </button>
            <h3 className={styles.message}>Verification is successful</h3>
            <div className={`${styles.center} ${styles.mgtop}`}>
              <ButtonFill text="Sign in" onClick={onClickHandler} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { MailVerificationSuccess };
