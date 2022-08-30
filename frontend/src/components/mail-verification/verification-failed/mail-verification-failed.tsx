import { FC } from 'react';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { emailSchema } from '@autoline/shared/validation-schemas/validation-schemas';
import { AppRoute } from '@common/enums/app/app';
import { StorageKey } from '@common/enums/enums';
import { EmailRequestData } from '@common/types/types';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import { useAppForm } from '@hooks/hooks';
import Container from '@mui/material/Container';
import { useRequestLinkMutation } from '@store/queries/verification-link';

import styles from './styles.module.scss';

const MailVerificationFailed: FC = (): React.ReactElement => {
  const [getLink, { isSuccess }] = useRequestLinkMutation();
  const navigate = useNavigate();
  const isLinkSent = localStorage.getItem(StorageKey.VERIFICATION_LINK);

  const { control, errors, handleSubmit } = useAppForm<EmailRequestData>({
    defaultValues: { email: '' },
    validationSchema: emailSchema,
  });

  const handleGetLink = async ({ email }: EmailRequestData): Promise<void> => {
    await getLink(email);
    if (isSuccess) {
      localStorage.setItem(StorageKey.VERIFICATION_LINK, 'sent');
    }
    navigate(AppRoute.SIGN_IN);
  };
  const location = useLocation();

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
            <Link to={AppRoute.ROOT}>
              <img className={styles.logo} src={Logo} alt="Autoline" />
            </Link>
            <h3 className={styles.red}> Verification is failed</h3>
            <p className={styles.message}>
              To request the new verification link, please enter your email and
              click the button below
            </p>
            <InputField
              name="email"
              type="email"
              required={true}
              control={control}
              errors={errors}
            />
            <div className={styles.center}>
              <ButtonFill
                text="Get verification link"
                onClick={handleSubmit(handleGetLink)}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { MailVerificationFailed };
