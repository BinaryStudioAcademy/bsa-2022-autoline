import * as Yup from 'yup';

const urlReg =
  /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/gm;
const phoneReg = /^(?:\+38)?(0[5-9][0-9]\d{7})$/gm;

const updateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .max(150, 'Full name must not exceed 100 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string().matches(phoneReg, 'Phone is invalid'),
  location: Yup.string().oneOf(['kyiv', 'kharkiv', 'odesa']),
  birthYear: Yup.number()
    .min(new Date().getFullYear() - 110)
    .max(new Date().getFullYear()),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters'),
  repeatNewPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters'),
  photoUrl: Yup.string().matches(urlReg, 'Photo url should be a valid URL'),
  sex: Yup.string().oneOf(['male', 'female', 'not_known', 'not_appliable']),
});

export { updateUserSchema };
