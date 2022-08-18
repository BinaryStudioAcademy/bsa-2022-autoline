import { UserRole, UserSex } from './user.enum';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  photo_url: string;
  role: UserRole;
  sex: UserSex;
}

export { type User };
