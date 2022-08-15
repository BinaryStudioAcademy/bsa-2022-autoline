import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { InputField } from '@components/common/input-field/input-field';
import { ProfileFields } from '@components/edit-profile/edit-profile';

interface FormInputProps {
  name:
    | 'sex'
    | 'year'
    | 'location'
    | 'fullName'
    | 'phone'
    | 'email'
    | 'repeatNewPassword'
    | 'currentPassword'
    | 'newPassword';
  type: string;
  control: Control<ProfileFields>;
  label: string;
}

export const FormInputText: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        // fieldState: { error },
        // formState,
      }): React.ReactElement => (
        <InputField
          name={label}
          required={true}
          value={value}
          onChange={onChange}
          type={type}
        />
      )}
    />
  );
};
