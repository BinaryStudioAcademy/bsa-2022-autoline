import { FC } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import Container from '@mui/material/Container';

import styles from './styles.module.scss';

const sendLinkHandler = (): void => {
  console.log('Відправляємо email');
};

const Failed: FC = (): React.ReactElement => {
  return (
    <div className={styles.bgImage}>
      <Container className={styles.wrapper}>
        <div className={styles.wrapperInner}>
          <div className={styles.content}>
            <Link to={AppRoute.ROOT}>
              <img className={styles.logo} src={Logo} alt="Autoline" />
            </Link>
            <h3> Verification is failed.</h3>
            <p>
              You can request new verification link, type your email and click
              button bellow.
            </p>
            <InputField name="email" type="email" required={true} />
            <ButtonFill
              text="Get verification link"
              onClick={sendLinkHandler}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export { Failed };
