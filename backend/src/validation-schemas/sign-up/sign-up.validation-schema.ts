import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters'),
});

export { signUpSchema };
