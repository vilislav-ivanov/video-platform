import { object, string } from 'yup';

export const createOrEditProviderSchema = object({
  body: object({
    info: string()
      .required('info is required')
      .min(50, 'info must be minimum 50 symbols'),
  }),
});
