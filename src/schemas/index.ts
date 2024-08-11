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
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Enter a valid email address',
  }),
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
