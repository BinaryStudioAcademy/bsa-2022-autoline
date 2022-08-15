import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CrossIcon from '@assets/images/edit-profile/cross.svg';
import DefaultAvatar from '@assets/images/edit-profile/default-avatar.png';
import PencilIcon from '@assets/images/edit-profile/pencil.svg';
import TrashIcon from '@assets/images/edit-profile/trash.svg';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { SelectField } from '@components/common/select-field/select-field';
import { FormInputText } from '@components/edit-profile/form-input-text/form-input-text';
import { SelectYearsRange } from '@components/edit-profile/select-years-range/select-years-range';
import { SignIn } from '@components/edit-profile/sign-in/sign-in';
import { MenuItem, SelectChangeEvent } from '@mui/material';

import styles from './styles.module.scss';

interface EditProfileProps {
  onClose: () => void;
}

export interface ProfileFields {
  sex: string;
  year: string;
  location: string;
  fullName: string;
  phone: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

export const EditProfile: React.FC<EditProfileProps> = ({ onClose }) => {
  const user = {
    sex: 'male',
    year: '1996',
    location: 'kyiv',
    fullName: 'stepan shevchenko',
    phone: '+380938889922',
    email: 'stepan1909@gmail.com',
  };

  const [sex, setSex] = useState(user.sex);
  const [year, setYear] = useState(user.year);
  const [location, setLocation] = useState(user.location);
  const { handleSubmit, watch, control } = useForm<ProfileFields>({
    defaultValues: {
      sex: user.sex,
      year: user.year,
      location: user.location,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type),
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectSexChange = (event: SelectChangeEvent): void => {
    setSex(event.target.value as string);
  };

  const handleSelectAgeChange = (event: SelectChangeEvent): void => {
    setYear(event.target.value as string);
  };

  const handleSelectLocationChange = (event: SelectChangeEvent): void => {
    setLocation(event.target.value as string);
  };

  const handleSelectClose = (): void => {
    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<ProfileFields> = (data) => {
    console.log('Submit', data);
    setIsLoading(true);
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <span className={styles.cross}>
          <img src={CrossIcon} alt="cross" onClick={(): void => onClose()} />
        </span>
        <h2 className={styles.mainTitle}>EDIT PROFILE</h2>
        <div className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatar} src={DefaultAvatar} alt="avatar" />
            <button>
              <img src={PencilIcon} alt="pencil" />
              <span>Change Photo</span>
            </button>
            <button>
              <img src={TrashIcon} alt="trash" />
              <span>Delete Profile</span>
            </button>
          </div>
          <div className={styles.editWrapper}>
            <form
              name="editForm"
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
            >
              <fieldset disabled={isLoading} className={styles.fieldset}>
                <h2 className={styles.title}>User Details</h2>
                <FormInputText
                  name="fullName"
                  control={control}
                  label="Full name"
                  type="text"
                />
                <div className={styles.selectsWrapper}>
                  <SelectField
                    id="sex"
                    name="sex"
                    value={sex}
                    onChange={handleSelectSexChange}
                    onClose={handleSelectClose}
                    required={false}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </SelectField>
                  <SelectYearsRange
                    start={1960}
                    end={new Date().getFullYear()}
                    name="age"
                    value={year}
                    onChange={handleSelectAgeChange}
                    onClose={handleSelectClose}
                    required={false}
                  />
                </div>
                <FormInputText
                  name="phone"
                  control={control}
                  label="Phone"
                  type="text"
                />
                <FormInputText
                  name="email"
                  control={control}
                  label="Email"
                  type="text"
                />
                <SelectField
                  id="location"
                  name="Location"
                  value={location}
                  onChange={handleSelectLocationChange}
                  onClose={handleSelectClose}
                  required={false}
                >
                  <MenuItem value="kyiv">Kyiv</MenuItem>
                  <MenuItem value="kharkiv">Kharkiv</MenuItem>
                  <MenuItem value="odesa">Odesa</MenuItem>
                </SelectField>
                <h2 className={styles.title}>Change Password</h2>
                <FormInputText
                  name="currentPassword"
                  control={control}
                  label="Current Password"
                  type="password"
                />
                <FormInputText
                  name="newPassword"
                  control={control}
                  label="New Password"
                  type="password"
                />
                <FormInputText
                  name="repeatNewPassword"
                  control={control}
                  label="Repeat New Password"
                  type="password"
                />
                <SignIn />
                <div className={styles.btnWrapper}>
                  <ButtonOutline
                    text="Cancel"
                    className={styles.cancel}
                    onClick={(): void => onClose()}
                  />
                  <ButtonFill text="Save" type="submit" />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
