import { UserSex } from './user.enum';

interface UserFields {
  sex: UserSex;
  birthYear: string;
  location: string;
  name: string;
  phone: string;
  email: string;
}

interface ProfileFieldsRequestData extends UserFields {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

type ProfileFieldsResponseData = UserFields;

export {
  type UserFields,
  type ProfileFieldsResponseData,
  type ProfileFieldsRequestData,
};
