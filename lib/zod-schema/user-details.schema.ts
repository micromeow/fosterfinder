import * as z from 'zod';

const userDetailsFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters',
    })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    }),
  username: z
    .string()
    .min(10, {
      message: 'Username must be at least 10 characters.',
    })
    .max(50, {
      message: 'Username must be at most 50 characters.',
    }),
});

export default userDetailsFormSchema;
