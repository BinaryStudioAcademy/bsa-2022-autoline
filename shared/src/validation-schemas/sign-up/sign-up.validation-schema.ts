import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(150, 'Full name must not exceed 150 characters')
    .matches(
      /^[A-Za-z]+[A-Za-z\s]+[A-Za-z]+$/,
      'Full name must contain only latin characters',
    ),
  email: Yup.string()
    .required('Email is required')
    .min(4, 'Email must be at least 4 characters')
    .max(70, 'Full name must not exceed 70 characters')
    .email('Email is invalid')
    .matches(
      /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(-[A-Za-z0-9]+)*\.[A-Za-z]+$/,
      'Email is invalid',
    ),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must not exceed 50 characters')
    .matches(
      /^[A-Za-z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
      'Password must contain only latin, special characters or digits',
    ),
  phone: Yup.string().matches(
    /^\+38\s\(0\d{2}\)\s\d{3}-\d{2}-\d{2}$/,
    'Phone is invalid, use format: +38 (0XX) XXX-XX-XX',
  ),
  location: Yup.string()
    .min(2, 'Location must be at least 2 characters')
    .max(150, 'Location must not exceed 150 characters')
    .matches(/^[A-Za-z]+$/, 'Location must contain only latin characters'),
});

export { signUpSchema };
