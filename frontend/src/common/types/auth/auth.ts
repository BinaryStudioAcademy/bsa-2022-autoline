export {
  type SignInRequestData,
  type SignInResponseData,
} from '@autoline/shared/common/types/types';

type SignInRequestUser = {
  user: {
    email: string;
    password: string;
  };
};

export { type SignInRequestUser };
