import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import { useAppForm } from '@hooks/hooks';
import Container from '@mui/material/Container';
import { useRequestLinkMutation } from '@store/queries/verification-link';

import styles from './styles.module.scss';
import { emailSchema } from './validation-schema';

declare type SignInRequestData = {
  email: string;
};

const MailVerificationFailed: FC = (): React.ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [validationError, setValidationError] = useState({
    email: { message: '' },
  });
  const [getLink] = useRequestLinkMutation();
  const navigate = useNavigate();
  setEmail('jkds');
  const { control, errors } = useAppForm<SignInRequestData>({
    defaultValues: { email: '' },
    validationSchema: emailSchema,
  });
  // const onChangeHandler = async (
  //   event: React.ChangeEvent<HTMLTextAreaElement>,
  // ): Promise<void> => {
  //   setEmail(event.target.value);
  // };
  console.log(errors);
  const sendLinkHandler = async (): Promise<void> => {
    try {
      await emailSchema.validate({ email });
      await getLink(email);
      navigate(AppRoute.SIGN_IN);
    } catch (error) {
      if (error instanceof Error) {
        setValidationError({
          email: { message: error.message },
        });
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
            {/* <form
              name="signinForm"
              onSubmit={handleSubmit(onSendLink)}
              className={styles.form}
            > */}
            <InputField
              name="email"
              type="email"
              required={true}
              control={control}
              errors={validationError}
              // onChange={onChangeHandler}
              placeholder="sdsd"
              defaultValue="sdfsd"
            />
            <div className={styles.center}>
              <ButtonFill
                text="Get verification link"
                onClick={sendLinkHandler}
              />
            </div>
            {/* </form> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export { MailVerificationFailed };
