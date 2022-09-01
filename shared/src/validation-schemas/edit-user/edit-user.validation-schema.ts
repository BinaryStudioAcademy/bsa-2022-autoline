import * as Yup from 'yup';

const phoneReg = /^(?:\+38)?(0[5-9][0-9]\d{7})$/gm;

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .max(150, 'Full name must not exceed 150 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string().matches(phoneReg, 'Phone is invalid'),
  sex: Yup.string().oneOf(['male', 'female', 'not_known', 'not_appliable']),
  role: Yup.string().oneOf(['user', 'admin']),
});

export { editUserSchema };
