import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import Container from '@mui/material/Container';
import { emailApi } from '@services/email-service';

import styles from './styles.module.scss';

const Failed: FC = (): React.ReactElement => {
  const [email, setEmail] = useState({ email: '' });
  const [requestLink] = emailApi.useRequestLinkMutation();
  const sendLinkHandler = async (): Promise<void> => {
    await requestLink(email);
    console.log('Відправляємо email', email);
  };
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
            <InputField
              name="email"
              type="email"
              required={true}
              onChange={(event): void =>
                setEmail({
                  email: event.target.value,
                })
              }
            />
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
