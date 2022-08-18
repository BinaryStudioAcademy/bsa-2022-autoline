import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import Container from '@mui/material/Container';
import { useRequestLinkMutation } from '@store/queries/verification-link';

import styles from './styles.module.scss';
import { emailSchema } from './validation-schema';

const Failed: FC = (): React.ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [validationError, setValidationError] = useState('');
  const [getLink] = useRequestLinkMutation();
  const navigate = useNavigate();

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): Promise<void> => {
    setEmail(event.target.value);
  };
  const sendLinkHandler = async (): Promise<void> => {
    try {
      await emailSchema.validate({ email });
      await getLink(email);
      navigate(AppRoute.SIGN_IN);
    } catch (error) {
      if (error instanceof Error) {
        setValidationError(error.message);
      }
    }
  };
  return (
    <div className={styles.bgImage}>
      <Container className={styles.wrapper}>
        <div className={styles.wrapperInner}>
          <div className={styles.content}>
            <Link to={AppRoute.ROOT}>
              <img className={styles.logo} src={Logo} alt="Autoline" />
            </Link>
            <h3 className={styles.red}> Verification is failed.</h3>
            <p>
              You can request new verification link, type your email and click
              button below.
            </p>
            <InputField
              name="email"
              type="email"
              required={true}
              errors={validationError}
              onChange={onChangeHandler}
            />
            <div className={styles.center}>
              <ButtonFill
                text="Get verification link"
                onClick={sendLinkHandler}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { Failed };