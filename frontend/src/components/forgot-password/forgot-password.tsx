import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { InputField } from '@components/common/input-field/input-field';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import { useForgotPasswordMutation } from '@store/queries/forgot-password';

import { forgotPassword as forgotPasswordSchema } from '../../../../shared/src/validation-schemas/validation-schemas';
import Logo from '../../assets/images/logo.svg';
import BgImage from '../../assets/images/sign-bg.jpg';
import styles from './styles.module.scss';

export const ForgotPassword = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [isSubmitted, setSubmitted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any): void => {
    setSubmitted(true);
    forgotPassword(data.email).unwrap();
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
            <h1 className={styles.title}>Trouble signing in?</h1>
            <p className={styles.subtitle}>
              <span>
                Don't worry, we've got your back! Just enter your email address
                and we'll send you a link with which you can reset your
                password.
              </span>
            </p>
            <form
              name="forgotpasswordForm"
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
            >
              <fieldset disabled={isLoading} className={styles.fieldset}>
                <InputField
                  name="Email"
                  registerName="email"
                  type="email"
                  required={true}
                  errors={errors.email?.message}
                  register={register}
                />
                {isSubmitted ? (
                  <Alert severity="info">
                    If you are a registered user, you will soon receive a
                    recovery link. Please check your inbox.
                  </Alert>
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

// export const ForgotPassword = (): React.ReactElement => {
//   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
//   const [email, setEmail] = useState('');
//   const [isSubmitted, setSubmitted] = useState(false);
//   const handleSubmit = (event: { preventDefault: () => void }): void => {
//     event.preventDefault();
//     setSubmitted(true);
//     console.log(email);
//     forgotPassword(email).unwrap();
//   };

//   const sectionStyle = {
//     backgroundImage: `url(${BgImage})`,
//   };

//   return (
//     <div style={sectionStyle} className={styles.bgImage}>
//       <Container className={styles.wrapper}>
//         <div className={styles.wrapperInner}>
//           <div className={styles.content}>
//             <Link to={AppRoute.ROOT}>
//               <img className={styles.logo} src={Logo} alt="Autoline" />
//             </Link>
//             <h1 className={styles.title}>Trouble signing in?</h1>
//             <p className={styles.subtitle}>
//               <span>
//                 Don't worry, we've got your back! Just enter your email address
//                 and we'll send you a link with which you can reset your
//                 password.
//               </span>
//             </p>
//             <form
//               name="forgotpasswordForm"
//               onSubmit={handleSubmit}
//               className={styles.form}
//             >
//               <fieldset disabled={isLoading} className={styles.fieldset}>
//                 <InputField
//                   name="Email"
//                   registerName="email"
//                   type="email"
//                   required={true}
//                   errors={''}
//                   onChange={(event): void => {
//                     setEmail(event.target.value);
//                   }}
//                 />
//                 {isSubmitted ? (
//                   <p className={styles.subtitle}>
//                     <span>
//                       If you are a registered user, you will soon receive a
//                       recovery link. Please check your inbox.
//                     </span>
//                   </p>
//                 ) : null}
//                 <ButtonFill text="Submit" />
//               </fieldset>
//             </form>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };
