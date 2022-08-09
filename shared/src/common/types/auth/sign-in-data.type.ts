type SignInRequestData = {
  email: string;
  password: string;
};

type SignInResponseData = {
  accessToken: string;
  refreshToken: string;
};

type ErrorMessage = {
  message: string;
};

export { type SignInRequestData, type SignInResponseData, type ErrorMessage };
