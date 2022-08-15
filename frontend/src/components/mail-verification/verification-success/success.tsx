import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import Container from '@mui/material/Container';

import styles from './styles.module.scss';

const Success: FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const onClickHandler = (): void => {
    navigate(AppRoute.SIGN_IN);
  };
  return (
    <div className={styles.bgImage}>
      <Container className={styles.wrapper}>
        <div className={styles.wrapperInner}>
          <div className={styles.content}>
            <Link to={AppRoute.ROOT}>
              <img className={styles.logo} src={Logo} alt="Autoline" />
            </Link>
            <h3 className={styles.green}>Verification is successful.</h3>
            <div className={`${styles.center} ${styles.mgtop}`}>
              <ButtonFill text="Sign in page" onClick={onClickHandler} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { Success };
