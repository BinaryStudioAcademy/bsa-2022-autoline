import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .max(100, 'Full name must not exceed 100 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password mu st be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters'),
  phone: Yup.string().matches(
    /^\+38\s\(0\d{2}\)\s\d{3}-\d{2}-\d{2}$/,
    'Phone is invalid, use format: +38 (0XX) XXX-XX-XX',
  ),
});

export { signUpSchema };
