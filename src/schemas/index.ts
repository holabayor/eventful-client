import * as z from 'zod';

export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: 'First name must be at least 3 characters',
    })
    .regex(/^[A-Za-z]+$/, {
      message: 'First name can only contain alphabets',
    }),
  lastName: z
    .string()
    .min(3, {
      message: 'Last name must be at least 3 characters',
    })
    .regex(/^[A-Za-z]+$/, {
      message: 'Last name can only contain alphabets',
    }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Enter a valid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Enter a valid email address',
  }),
});

export const otpSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, {
        message: 'Password must be at least 6 characters',
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((password) => /\d/.test(password), {
        message: 'Password must contain at least one number',
      })
      .refine((password) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password), {
        message: 'Password must contain at least one symbol',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not mtach',
    path: ['confirmPassword'],
  });

const isBrowser = typeof window !== 'undefined';

export const EventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.date({ required_error: 'Event date is required' }),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  imageFile: isBrowser
    ? z
        .instanceof(FileList)
        .refine((file) => file && file.item(0)?.type.startsWith('image/'), {
          message: 'Only image files are allowed',
        })
        .optional()
    : z.any().optional(),
  category: z.string().min(1, 'Category is required'),
  additionalDetails: z.string().optional(),
});
