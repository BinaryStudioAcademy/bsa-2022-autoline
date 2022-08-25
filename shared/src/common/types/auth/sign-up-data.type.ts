type SignUpRequestData = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
};

type SignUpResponseData = {
  message: string;
};

export { type SignUpRequestData, type SignUpResponseData };
