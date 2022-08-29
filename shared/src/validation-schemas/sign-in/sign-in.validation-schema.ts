import * as Yup from 'yup';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .min(4, 'Email must be at least 4 characters')
    .max(70, 'Full name must not exceed 70 characters')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must not exceed 50 characters')
    .matches(
      /^[A-Za-z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
      'Password must contain only latin, special characters or digits',
    ),
});

export { signInSchema };
