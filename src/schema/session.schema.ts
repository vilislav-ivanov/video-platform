import { object, string } from 'yup';

export const createSessionSchema = object({
  body: object({
    email: string()
      .email('must be a valid email')
      .required('email is required'),
    password: string()
      .required('password is required.')
      .min(6, 'password is too short.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'password can only contain latin letters.'),
  }),
});
