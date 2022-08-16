enum Role {
  user,
  admin,
}

enum Sex {
  male,
  female,
  not_known,
  not_appliable,
}

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  photo_url: string;
  role: Role;
  sex: Sex;
}

export { type User, type Role, type Sex };
