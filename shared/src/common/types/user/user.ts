import { UserRole, UserSex } from './user.enum';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  photo_url: string;
  birth_year: number;
  role: UserRole;
  sex: UserSex;
}

export { type User };
