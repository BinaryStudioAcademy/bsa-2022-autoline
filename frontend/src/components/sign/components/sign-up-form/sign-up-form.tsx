import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { InputField } from '@components/common/input-field/input-field';
import { SelectField } from '@components/common/select-field/select-field';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import Divider from '@mui/material/Divider';

import styles from './styles.module.scss';

export const SignUpForm = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('');
  const handleSubmit = (): void => {
    setIsLoading(true);
  };

  const handleSelectChange = (event: SelectChangeEvent): void => {
    setLocation(event.target.value as string);
  };

  const handleSelectClose = (): void => {
    setIsLoading(false);
  };

  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <p className={styles.subtitle}>
        <span>I have an account? </span>
        <Link className={styles.link} to={AppRoute.SIGN_IN}>
          Sign In
        </Link>
      </p>
      <form name="signupForm" onSubmit={handleSubmit} className={styles.form}>
        <fieldset disabled={isLoading} className={styles.fieldset}>
          <InputField name="Full name" type="text" required={true} />
          <InputField name="Email" type="email" required={true} />
          <InputField name="Password" type="password" required={true} />
          <InputField name="Repeat Password" type="password" required={true} />
          <InputField name="Phone" type="tel" required={false} />
          <SelectField
            id="location"
            name="Location"
            value={location}
            onChange={handleSelectChange}
            onClose={handleSelectClose}
            required={false}
          >
            <MenuItem value="kyiv">Kyiv</MenuItem>
            <MenuItem value="kharkiv">Kharkiv</MenuItem>
            <MenuItem value="odesa">Odesa</MenuItem>
          </SelectField>
          <ButtonFill text="Create Account" />
        </fieldset>
      </form>
      <div className={styles.formBottom}>
        <Divider className={styles.divider}>or</Divider>
        <div className={styles.buttonsGroup}>
          <ButtonOutline text="Sign Up with Google" />
          <ButtonOutline text="Sign Up with Facebook" />
        </div>
      </div>
    </>
  );
};
