type SignUpRequestData = {
  name: string;
  email: string;
  password: string;
};

type SignUpResponseData = {
  message: string;
};

export { type SignUpRequestData, type SignUpResponseData };
