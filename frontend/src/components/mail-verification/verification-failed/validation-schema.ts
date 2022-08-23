import * as Yup from 'yup';

const emailSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
});

export { emailSchema };
